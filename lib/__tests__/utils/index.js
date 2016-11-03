/**
 * Copyright 2013-present, Novivia, Inc.
 * All rights reserved.
 */

import {exec} from "child_process";
import {join as joinPath} from "path";

export const FIXTURES_PATH = joinPath(
  __dirname,
  "..",
  "__fixtures__",
);

export function execute(filePath) {
  return new Promise(
    (resolve, reject) => exec(
      `"${process.execPath}" ${filePath}`,
      err => (err ? reject(err) : resolve()),
    ),
  );
}
