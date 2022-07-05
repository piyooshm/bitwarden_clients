import { makeStaticByteArray } from "../utils";

describe("isBufferEqualTo custom matcher", () => {
  it("matches identical ArrayBuffers", () => {
    const array = makeStaticByteArray(10);
    expect(array.buffer).isBufferEqualTo(array.buffer);
  });

  it("matches an identical ArrayBuffer and Uint8Array", () => {
    const array = makeStaticByteArray(10);
    expect(array.buffer).isBufferEqualTo(array);
  });

  it("doesn't match different ArrayBuffers", () => {
    const array1 = makeStaticByteArray(10);
    const array2 = makeStaticByteArray(10, 11);
    expect(array1.buffer).not.isBufferEqualTo(array2.buffer);
  });

  it("doesn't match a different ArrayBuffer and Uint8Array", () => {
    const array1 = makeStaticByteArray(10);
    const array2 = makeStaticByteArray(10, 11);
    expect(array1.buffer).not.isBufferEqualTo(array2);
  });
});
