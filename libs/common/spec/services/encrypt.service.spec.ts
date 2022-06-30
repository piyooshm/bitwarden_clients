import { mockReset, mock } from "jest-mock-extended";

import { CryptoFunctionService } from "@bitwarden/common/abstractions/cryptoFunction.service";
import { LogService } from "@bitwarden/common/abstractions/log.service";
import { EncryptionType } from "@bitwarden/common/enums/encryptionType";
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

  it("encryptToBytes encrypts data with provided key", async () => {
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
