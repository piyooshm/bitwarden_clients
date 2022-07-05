import { EncryptionType } from "@bitwarden/common/enums/encryptionType";
import { EncArrayBuffer } from "@bitwarden/common/models/domain/encArrayBuffer";

import { makeStaticByteArray } from "../utils";

describe("encArrayBuffer", () => {
  describe("parses the buffer", () => {
    test.each([
      [EncryptionType.AesCbc128_HmacSha256_B64, "AesCbc128_HmacSha256_B64"],
      [EncryptionType.AesCbc256_HmacSha256_B64, "AesCbc256_HmacSha256_B64"],
    ])("with %c%s", (encType: EncryptionType) => {
      const iv = makeStaticByteArray(16, 10);
      const mac = makeStaticByteArray(32, 20);
      const cipherText = makeStaticByteArray(20, 30);

      const array = new Uint8Array(1 + iv.byteLength + mac.byteLength + cipherText.byteLength);
      array.set([encType]);
      array.set(iv, 1);
      array.set(mac, 1 + iv.byteLength);
      array.set(cipherText, 1 + iv.byteLength + mac.byteLength);

      const actual = new EncArrayBuffer(array.buffer);

      expect(actual.encryptionType).toEqual(encType);
      expect(actual.ivBytes).isBufferEqualTo(iv);
      expect(actual.macBytes).isBufferEqualTo(mac);
      expect(actual.ctBytes).isBufferEqualTo(cipherText);
    });

    it("with AesCbc256_B64", () => {
      const encType = EncryptionType.AesCbc256_B64;
      const iv = makeStaticByteArray(16, 10);
      const cipherText = makeStaticByteArray(20, 30);

      const array = new Uint8Array(1 + iv.byteLength + cipherText.byteLength);
      array.set([encType]);
      array.set(iv, 1);
      array.set(cipherText, 1 + iv.byteLength);

      const actual = new EncArrayBuffer(array.buffer);

      expect(actual.encryptionType).toEqual(encType);
      expect(actual.ivBytes).isBufferEqualTo(iv);
      expect(actual.ctBytes).isBufferEqualTo(cipherText);
      expect(actual.macBytes).toBeNull();
    });
  });

  it("doesn't parse the buffer if invalid", () => {
    const invalidBuffer = makeStaticByteArray(10, 1);
    const actual = new EncArrayBuffer(invalidBuffer.buffer);

    expect(actual.buffer).not.toBeNull();
    expect(actual.ctBytes).toBeNull();
    expect(actual.encryptionType).toBeNull();
    expect(actual.ivBytes).toBeNull();
    expect(actual.macBytes).toBeNull();
  });
});
