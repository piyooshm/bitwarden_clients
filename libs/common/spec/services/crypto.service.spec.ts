import { mock, mockReset } from "jest-mock-extended";

import { AbstractEncryptService } from "@bitwarden/common/abstractions/abstractEncrypt.service";
import { CryptoFunctionService } from "@bitwarden/common/abstractions/cryptoFunction.service";
import { LogService } from "@bitwarden/common/abstractions/log.service";
import { PlatformUtilsService } from "@bitwarden/common/abstractions/platformUtils.service";
import { StateService } from "@bitwarden/common/abstractions/state.service";
import { EncryptionType } from "@bitwarden/common/enums/encryptionType";
import { Utils } from "@bitwarden/common/misc/utils";
import { EncString } from "@bitwarden/common/models/domain/encString";
import { SymmetricCryptoKey } from "@bitwarden/common/models/domain/symmetricCryptoKey";
import { CryptoService } from "@bitwarden/common/services/crypto.service";

import { makeStaticByteArray } from "../utils";

// Custom matcher to compare a received ArrayBuffer to an expected Uint8Array
// This is because our services pass around ArrayBuffers that can't be compared directly
expect.extend({
  isBufferEqualTo(received, expected: Uint8Array | ArrayBuffer) {
    received = new Uint8Array(received);

    if (expected instanceof ArrayBuffer) {
      expected = new Uint8Array(expected);
    }

    if (this.equals(received, expected)) {
      return {
        message: () => `expected
${received}
not to match
${expected}`,
        pass: true,
      };
    }

    return {
      message: () => `expected
${received}
to match
${expected}`,
      pass: false,
    };
  },
});

describe("cryptoService", () => {
  let cryptoService: CryptoService;

  const cryptoFunctionService = mock<CryptoFunctionService>();
  const encryptService = mock<AbstractEncryptService>();
  const platformUtilService = mock<PlatformUtilsService>();
  const logService = mock<LogService>();
  const stateService = mock<StateService>();

  beforeEach(() => {
    mockReset(cryptoFunctionService);
    mockReset(encryptService);
    mockReset(platformUtilService);
    mockReset(logService);
    mockReset(stateService);

    cryptoService = new CryptoService(
      cryptoFunctionService,
      encryptService,
      platformUtilService,
      logService,
      stateService
    );
  });

  describe("decryptFromBytes", () => {
    const encType = EncryptionType.AesCbc256_HmacSha256_B64;
    let iv: Uint8Array;
    let mac: Uint8Array;
    let cipherText: Uint8Array;
    let encArray: Uint8Array;

    let key: SymmetricCryptoKey;

    const computedMac = new Uint8Array(1).buffer;
    const decryptedBytes = makeStaticByteArray(10, 100);

    beforeEach(() => {
      iv = makeStaticByteArray(16, 10);
      mac = makeStaticByteArray(32, 20);
      cipherText = makeStaticByteArray(20, 30);

      encArray = new Uint8Array(1 + iv.byteLength + mac.byteLength + cipherText.byteLength);
      encArray.set([encType]);
      encArray.set(iv, 1);
      encArray.set(mac, 1 + iv.byteLength);
      encArray.set(cipherText, 1 + iv.byteLength + mac.byteLength);

      key = mock<SymmetricCryptoKey>();
      key.macKey = makeStaticByteArray(16, 40);
      key.encKey = makeStaticByteArray(10, 50);
      key.encType = encType;

      cryptoFunctionService.hmac.mockResolvedValue(computedMac);
    });

    it("decrypts correctly", async () => {
      cryptoFunctionService.hmac.mockResolvedValue(makeStaticByteArray(1).buffer);
      cryptoFunctionService.compare.mockResolvedValue(true);
      cryptoFunctionService.aesDecrypt.mockResolvedValueOnce(decryptedBytes);

      const actual = await cryptoService.decryptFromBytes(encArray.buffer, key);

      expect(cryptoFunctionService.aesDecrypt).toBeCalledWith(
        (expect as any).isBufferEqualTo(cipherText),
        (expect as any).isBufferEqualTo(iv),
        (expect as any).isBufferEqualTo(key.encKey)
      );

      expect(new Uint8Array(actual)).toEqual(decryptedBytes);
    });

    it("compares macs", async () => {
      const expectedMacData = new Uint8Array(iv.buffer.byteLength + cipherText.buffer.byteLength);
      expectedMacData.set(iv);
      expectedMacData.set(cipherText, iv.buffer.byteLength);

      await cryptoService.decryptFromBytes(encArray.buffer, key);

      expect(cryptoFunctionService.hmac).toBeCalledWith(
        (expect as any).isBufferEqualTo(expectedMacData),
        key.macKey,
        "sha256"
      );

      expect(cryptoFunctionService.compare).toBeCalledWith(
        (expect as any).isBufferEqualTo(mac),
        (expect as any).isBufferEqualTo(computedMac)
      );
    });

    it("returns null if macs don't match", async () => {
      cryptoFunctionService.compare.mockResolvedValue(false);

      const actual = await cryptoService.decryptFromBytes(encArray.buffer, key);
      expect(cryptoFunctionService.compare).toHaveBeenCalled();
      expect(cryptoFunctionService.aesDecrypt).not.toHaveBeenCalled();
      expect(actual).toBeNull();
    });

    it("returns null if encTypes don't match", async () => {
      key.encType = EncryptionType.AesCbc256_B64;
      cryptoFunctionService.compare.mockResolvedValue(true);

      const actual = await cryptoService.decryptFromBytes(encArray.buffer, key);

      expect(actual).toBeNull();
      expect(cryptoFunctionService.aesDecrypt).not.toHaveBeenCalled();
    });
  });

  describe("decryptToBytes", () => {
    const encType = EncryptionType.AesCbc256_HmacSha256_B64;

    let key: SymmetricCryptoKey;
    let encString: EncString;

    const iv = Utils.fromBufferToB64(makeStaticByteArray(16, 10));
    const mac = Utils.fromBufferToB64(makeStaticByteArray(32, 20));
    const cipherText = Utils.fromBufferToB64(makeStaticByteArray(20, 30));

    const decryptedBytes = makeStaticByteArray(10, 100);
    const computedMac = new Uint8Array(1).buffer;

    beforeEach(() => {
      encString = new EncString(encType, cipherText, iv, mac);

      key = mock<SymmetricCryptoKey>();
      key.macKey = makeStaticByteArray(16, 40);
      key.encKey = makeStaticByteArray(10, 50);
      key.encType = encType;

      cryptoFunctionService.hmac.mockResolvedValue(computedMac);
      cryptoFunctionService.aesDecrypt.mockResolvedValue(decryptedBytes);
    });

    it("decrypts correctly", async () => {
      cryptoFunctionService.compare.mockResolvedValue(true);

      const actual = await cryptoService.decryptToBytes(encString, key);

      expect(cryptoFunctionService.aesDecrypt).toBeCalledWith(
        (expect as any).isBufferEqualTo(Utils.fromB64ToArray(encString.data)),
        (expect as any).isBufferEqualTo(Utils.fromB64ToArray(encString.iv)),
        (expect as any).isBufferEqualTo(key.encKey)
      );

      expect(new Uint8Array(actual)).toEqual(decryptedBytes);
    });

    it("compares macs", async () => {
      const iv = Utils.fromB64ToArray(encString.iv);
      const mac = Utils.fromB64ToArray(encString.mac);
      const cipherText = Utils.fromB64ToArray(encString.data);

      const expectedMacData = new Uint8Array(iv.buffer.byteLength + cipherText.buffer.byteLength);
      expectedMacData.set(iv);
      expectedMacData.set(cipherText, iv.buffer.byteLength);

      await cryptoService.decryptToBytes(encString, key);

      expect(cryptoFunctionService.hmac).toBeCalledWith(
        (expect as any).isBufferEqualTo(expectedMacData),
        key.macKey,
        "sha256"
      );

      expect(cryptoFunctionService.compare).toBeCalledWith(
        (expect as any).isBufferEqualTo(mac),
        (expect as any).isBufferEqualTo(computedMac)
      );
    });

    it("returns null if macs don't match", async () => {
      cryptoFunctionService.compare.mockResolvedValue(false);

      const actual = await cryptoService.decryptToBytes(encString, key);

      expect(cryptoFunctionService.compare).toHaveBeenCalled();
      expect(cryptoFunctionService.aesDecrypt).not.toHaveBeenCalled();
      expect(actual).toBeNull();
    });

    it("returns null if encTypes don't match", async () => {
      encString.encryptionType = EncryptionType.AesCbc256_B64;
      cryptoFunctionService.compare.mockResolvedValue(true);

      const actual = await cryptoService.decryptToBytes(encString, key);

      expect(cryptoFunctionService.aesDecrypt).not.toHaveBeenCalled();
      expect(actual).toBeNull();
    });
  });
});
