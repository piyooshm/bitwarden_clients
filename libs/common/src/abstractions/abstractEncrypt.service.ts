import { EncString } from "@bitwarden/common/models/domain/encString";
import { SymmetricCryptoKey } from "@bitwarden/common/models/domain/symmetricCryptoKey";

import { EncArrayBuffer } from "../models/domain/encArrayBuffer";

export abstract class AbstractEncryptService {
  abstract encrypt(plainValue: string | ArrayBuffer, key: SymmetricCryptoKey): Promise<EncString>;
  abstract encryptToBytes: (
    plainValue: ArrayBuffer,
    key?: SymmetricCryptoKey
  ) => Promise<EncArrayBuffer>;
  abstract decryptToUtf8: (encString: EncString, key: SymmetricCryptoKey) => Promise<string>;
  abstract decryptToBytes: (encString: EncString, key: SymmetricCryptoKey) => Promise<ArrayBuffer>;
  abstract decryptFromBytes: (
    encBuffer: EncArrayBuffer,
    key: SymmetricCryptoKey
  ) => Promise<ArrayBuffer>;
}
