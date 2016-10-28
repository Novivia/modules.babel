/**
 * Copyright 2013-present, Novivia, Inc.
 * All rights reserved.
 */

import {exec} from "child_process";
import {join as joinPath} from "path";
import requireHook from "../..";

function execute(filePath) {
  return new Promise(
    (resolve, reject) => exec(
      `"${process.execPath}" ${filePath}`,
      err => (err ? reject(err) : resolve()),
    ),
  );
}

const FIXTURES_PATH = joinPath(
  __dirname,
  "__fixtures__",
);

const defaultInterval = jasmine.DEFAULT_TIMEOUT_INTERVAL;

describe(
  "Require hook",
  () => {
    const REQUIRE_HOOK_FIXTURES_PATH = joinPath(
      FIXTURES_PATH,
      "requireHook",
    );

    beforeAll(() => (jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000));
    afterAll(() => (jasmine.DEFAULT_TIMEOUT_INTERVAL = defaultInterval));

    it(
      "returns a valid function by default",
      () => {
        expect(requireHook).toBeDefined();
        expect(typeof requireHook).toBe("function");
        expect(requireHook).not.toThrow();
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
