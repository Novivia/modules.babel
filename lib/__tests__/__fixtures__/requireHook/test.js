/* eslint-disable */
import test2 from "./test2";

function myDecorator() {
  return () => null;
}

export default class Test {
  classProperty = "a test";

  constructor() {
    const needPolyfill = {a: 1};
    Object.defineProperty(needPolyfill, "b", {value: 2});
    needPolyfill[Symbol("c")] = 3;

    Reflect.ownKeys(needPolyfill);

    return `template literal`;
  }

  @myDecorator
  dummy() {}

  runTest() {
    return test2();
  }
}
