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

      // Note: comparing 2 ArrayBuffers will always pass, need to wrap in Uint8Arrays
      const actual = new EncArrayBuffer(array.buffer);
      const actualIv = new Uint8Array(actual.ivBytes);
      const actualMac = new Uint8Array(actual.macBytes);
      const actualCipherText = new Uint8Array(actual.ctBytes);

      expect(actual.encryptionType).toEqual(encType);
      expect(actualIv).toEqual(iv);
      expect(actualMac).toEqual(mac);
      expect(actualCipherText).toEqual(cipherText);
    });

    it("with AesCbc256_B64", () => {
      const encType = EncryptionType.AesCbc256_B64;
      const iv = makeStaticByteArray(16, 10);
      const cipherText = makeStaticByteArray(20, 30);

      const array = new Uint8Array(1 + iv.byteLength + cipherText.byteLength);
      array.set([encType]);
      array.set(iv, 1);
      array.set(cipherText, 1 + iv.byteLength);

      // Note: comparing 2 ArrayBuffers will always pass, need to wrap in Uint8Arrays
      const actual = new EncArrayBuffer(array.buffer);
      const actualIv = new Uint8Array(actual.ivBytes);
      const actualCipherText = new Uint8Array(actual.ctBytes);

      expect(actual.encryptionType).toEqual(encType);
      expect(actualIv).toEqual(iv);
      expect(actualCipherText).toEqual(cipherText);
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
