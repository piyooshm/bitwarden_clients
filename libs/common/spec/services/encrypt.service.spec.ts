import { mockReset, mock } from "jest-mock-extended";

import { CryptoFunctionService } from "@bitwarden/common/abstractions/cryptoFunction.service";
import { LogService } from "@bitwarden/common/abstractions/log.service";
import { EncryptionType } from "@bitwarden/common/enums/encryptionType";
import { Utils } from "@bitwarden/common/misc/utils";
import { EncArrayBuffer } from "@bitwarden/common/models/domain/encArrayBuffer";
import { EncString } from "@bitwarden/common/models/domain/encString";
import { SymmetricCryptoKey } from "@bitwarden/common/models/domain/symmetricCryptoKey";
import { EncryptService } from "@bitwarden/common/services/encrypt.service";

import { makeStaticByteArray } from "../utils";

describe("EncryptService", () => {
  const cryptoFunctionService = mock<CryptoFunctionService>();
  const logService = mock<LogService>();

  let encryptService: EncryptService;

  beforeEach(() => {
    mockReset(cryptoFunctionService);
    mockReset(logService);

    encryptService = new EncryptService(cryptoFunctionService, logService, true);
  });

  describe("encryptToBytes", () => {
    it("encrypts data with provided key", async () => {
      const key = mock<SymmetricCryptoKey>();
      const encType = EncryptionType.AesCbc128_HmacSha256_B64;
      key.encType = encType;

      const plainValue = makeStaticByteArray(16, 1);
      key.macKey = makeStaticByteArray(16, 20);
      const iv = makeStaticByteArray(16, 30);
      const mac = makeStaticByteArray(32, 40);
      const encryptedData = makeStaticByteArray(20, 50);

      cryptoFunctionService.randomBytes.calledWith(16).mockResolvedValueOnce(iv.buffer);
      cryptoFunctionService.aesEncrypt.mockResolvedValue(encryptedData.buffer);
      cryptoFunctionService.hmac.mockResolvedValue(mac.buffer);

      const actual = await encryptService.encryptToBytes(plainValue, key);
      const actualBytes = new Uint8Array(actual.buffer);

      expect(actualBytes[0]).toEqual(encType);
      expect(actualBytes.slice(1, 17)).toEqual(iv);
      expect(actualBytes.slice(17, 49)).toEqual(mac);
      expect(actualBytes.slice(49)).toEqual(encryptedData);
      expect(actualBytes.byteLength).toEqual(
        1 + iv.byteLength + mac.byteLength + encryptedData.byteLength
      );
    });
  });

  describe("decryptToBytes", () => {
    describe("given an EncArrayBuffer", () => {
      const encType = EncryptionType.AesCbc256_HmacSha256_B64;

      const encryptedBytes = makeStaticByteArray(60);
      const tempArray = new Uint8Array(1 + encryptedBytes.buffer.byteLength);
      tempArray.set([encType]);
      tempArray.set(encryptedBytes, 1);
      const encBuffer = new EncArrayBuffer(tempArray.buffer);

      const key = new SymmetricCryptoKey(makeStaticByteArray(64, 100), encType);

      const decryptedBytes = makeStaticByteArray(10, 200).buffer;
      const computedMac = new Uint8Array(1).buffer;

      beforeEach(() => {
        cryptoFunctionService.hmac.mockResolvedValue(computedMac);
      });

      it("decrypts correctly", async () => {
        cryptoFunctionService.hmac.mockResolvedValue(makeStaticByteArray(1).buffer);
        cryptoFunctionService.compare.mockResolvedValue(true);
        cryptoFunctionService.aesDecrypt.mockResolvedValueOnce(decryptedBytes);

        const actual = await encryptService.decryptToBytes(encBuffer, key);

        expect(cryptoFunctionService.aesDecrypt).toBeCalledWith(
          expect.isBufferEqualTo(encBuffer.ctBytes),
          expect.isBufferEqualTo(encBuffer.ivBytes),
          expect.isBufferEqualTo(key.encKey)
        );

        expect(actual).isBufferEqualTo(decryptedBytes);
      });

      it("compares macs", async () => {
        const expectedMacData = new Uint8Array(
          encBuffer.ivBytes.byteLength + encBuffer.ctBytes.byteLength
        );
        expectedMacData.set(encBuffer.iv);
        expectedMacData.set(encBuffer.ct, encBuffer.ivBytes.byteLength);

        await encryptService.decryptToBytes(encBuffer, key);

        expect(cryptoFunctionService.hmac).toBeCalledWith(
          expect.isBufferEqualTo(expectedMacData),
          key.macKey,
          "sha256"
        );

        expect(cryptoFunctionService.compare).toBeCalledWith(
          expect.isBufferEqualTo(encBuffer.macBytes),
          expect.isBufferEqualTo(computedMac)
        );
      });

      it("returns null if macs don't match", async () => {
        cryptoFunctionService.compare.mockResolvedValue(false);

        const actual = await encryptService.decryptToBytes(encBuffer, key);
        expect(cryptoFunctionService.compare).toHaveBeenCalled();
        expect(cryptoFunctionService.aesDecrypt).not.toHaveBeenCalled();
        expect(actual).toBeNull();
      });

      it("returns null if encTypes don't match", async () => {
        key.encType = EncryptionType.AesCbc256_B64;
        cryptoFunctionService.compare.mockResolvedValue(true);

        const actual = await encryptService.decryptToBytes(encBuffer, key);

        expect(actual).toBeNull();
        expect(cryptoFunctionService.aesDecrypt).not.toHaveBeenCalled();
      });
    });

    describe("given an EncString", () => {
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

        const actual = await encryptService.decryptToBytes(encString, key);

        expect(cryptoFunctionService.aesDecrypt).toBeCalledWith(
          expect.isBufferEqualTo(Utils.fromB64ToArray(encString.data)),
          expect.isBufferEqualTo(Utils.fromB64ToArray(encString.iv)),
          expect.isBufferEqualTo(key.encKey)
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

        await encryptService.decryptToBytes(encString, key);

        expect(cryptoFunctionService.hmac).toBeCalledWith(
          expect.isBufferEqualTo(expectedMacData),
          key.macKey,
          "sha256"
        );

        expect(cryptoFunctionService.compare).toBeCalledWith(
          expect.isBufferEqualTo(mac),
          expect.isBufferEqualTo(computedMac)
        );
      });

      it("returns null if macs don't match", async () => {
        cryptoFunctionService.compare.mockResolvedValue(false);

        const actual = await encryptService.decryptToBytes(encString, key);

        expect(cryptoFunctionService.compare).toHaveBeenCalled();
        expect(cryptoFunctionService.aesDecrypt).not.toHaveBeenCalled();
        expect(actual).toBeNull();
      });

      it("returns null if encTypes don't match", async () => {
        encString.encryptionType = EncryptionType.AesCbc256_B64;
        cryptoFunctionService.compare.mockResolvedValue(true);

        const actual = await encryptService.decryptToBytes(encString, key);

        expect(cryptoFunctionService.aesDecrypt).not.toHaveBeenCalled();
        expect(actual).toBeNull();
      });
    });
  });
});
