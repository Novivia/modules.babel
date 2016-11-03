/**
 * Copyright 2013-present, Novivia, Inc.
 * All rights reserved.
 */

import {
  execute,
  FIXTURES_PATH,
} from "./utils";
import {join as joinPath} from "path";
import requireHook from "../..";

const defaultInterval = jasmine.DEFAULT_TIMEOUT_INTERVAL;

const REQUIRE_HOOK_FIXTURES_PATH = joinPath(
  FIXTURES_PATH,
  "requireHook",
);

describe(
  "Require hook",
  () => {
    beforeAll(() => (jasmine.DEFAULT_TIMEOUT_INTERVAL = 25000));
    afterAll(() => (jasmine.DEFAULT_TIMEOUT_INTERVAL = defaultInterval));

    it(
      "returns a valid function by default",
      () => {
        expect(requireHook).toBeDefined();
        expect(typeof requireHook).toBe("function");
        expect(() => requireHook({usePolyfill: false})).not.toThrow();
      },
    );

    it(
      "loads basic files correctly",
      async () => execute(joinPath(REQUIRE_HOOK_FIXTURES_PATH, "basic")),
    );

    it(
      "doesn't load basic files correctly without the require hook",
      async () => {
        try {
          await execute(joinPath(REQUIRE_HOOK_FIXTURES_PATH, "basic_failing"));
        } catch ({message}) {
          expect(message).toMatch(/SyntaxError/);
        }
      },
    );

    it(
      "loads JSON5 files correctly",
      async () => execute(joinPath(REQUIRE_HOOK_FIXTURES_PATH, "json5")),
    );

    it(
      "doesn't load JSON5 files correctly without the require hook",
      async () => {
        try {
          await execute(joinPath(REQUIRE_HOOK_FIXTURES_PATH, "json5_failing"));
        } catch ({message}) {
          // eslint-disable-next-line no-useless-escape
          expect(message).toMatch(/Cannot find module \'\.\/jsontest\'/);
        }
      },
    );

    it(
      "compiles specific scopes correctly",
      async () => execute(joinPath(REQUIRE_HOOK_FIXTURES_PATH, "basicModule")),
    );

    it(
      "doesn't compiles specific excluded scopes correctly",
      async () => {
        try {
          await execute(joinPath(
            REQUIRE_HOOK_FIXTURES_PATH,
            "basicModule/failing",
          ));
        } catch ({message}) {
          expect(message).toMatch(/SyntaxError/);
        }
      },
    );
  },
);
