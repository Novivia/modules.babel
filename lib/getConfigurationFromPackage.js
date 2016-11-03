/**
 * Copyright 2013-present, Novivia, Inc.
 * All rights reserved.
 */

import pkginfo from "pkginfo-json5";

export default function getConfigurationFromPackage({
  module,
  rootDirectory,
} = {}) {
  return pkginfo(
    // If `module` was provided, attempt to extract additional configuration
    // options from that module's package.
    module,
    {
      // If `module` was not provided, use the current process' working
      // directory and still attempt to extract additional configuration options
      // from that module's package.
      dir: module ? undefined : rootDirectory || process.cwd(),
      include: ["novivia-babel"],
    },
  )["novivia-babel"] || {};
}
