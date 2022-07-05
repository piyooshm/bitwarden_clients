export const toEqualBuffer: jest.CustomMatcher = function (
  received: ArrayBuffer,
  expected: Uint8Array | ArrayBuffer
) {
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
};
