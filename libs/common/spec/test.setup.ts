import { webcrypto } from "crypto";

import { isBufferEqualTo } from "../spec/matchers/isBufferEqualTo";

Object.defineProperty(window, "crypto", {
  value: webcrypto,
});

// Add custom matchers

expect.extend({
  isBufferEqualTo,
});

interface CustomMatchers<R = unknown> {
  isBufferEqualTo(expected: Uint8Array | ArrayBuffer): R;
}

/* eslint-disable */
declare global {
  namespace jest {
    interface Expect extends CustomMatchers {}
    interface Matchers<R> extends CustomMatchers<R> {}
    interface InverseAsymmetricMatchers extends CustomMatchers {}
  }
}
/* eslint-enable */
