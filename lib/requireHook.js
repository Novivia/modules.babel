/**
 * Copyright 2013-present, Novivia, Inc.
 * All rights reserved.
 */

import getBackendConfiguration from "../config/backend";
import pkginfo from "pkginfo-json5";

/**
 * A module providing a utility to bootstrap and configure in-memory require
 * hooks.
 */

export default function requireHook({
  babelOptions = {},
  module,
  rootDirectory,
  useJSON5 = true,
  usePolyfill = true,
} = {}) {
  const configurationFromPackage = pkginfo(
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

  const babelConfiguration = getBackendConfiguration({
    eliminateNonBuildingCode: false,
  });

  const finalBabelConfiguration = {
    // Ignore nothing by default. "node_modules" will be added with different
    // conditions below.
    ignore: [],

    // Compile in the program directory by default.
    sourceRoot: process.cwd(),

    ...babelConfiguration,
    ...(configurationFromPackage.babelOptions || {}),
    ...babelOptions,
  };

  finalBabelConfiguration.ignore = finalBabelConfiguration.ignore || [];

  /* istanbul ignore if */
  if (
    // FIXME: Replace with the proper utility once the utility module is out
    // there.
    process.env.NODE_ENV !== "production" &&
    configurationFromPackage.includeDevScopes
  ) {
    finalBabelConfiguration.ignore.push(
      new RegExp(`node_modules[\\/](?!@(${[
        "novivia",
        ...configurationFromPackage.includeDevScopes,
      ].join("|")})/)`),
    );
  } else {
    finalBabelConfiguration.ignore.push(/node_modules/);
  }

  if (useJSON5) {
    require("json5/lib/require");
  }

  if (usePolyfill) {
    require("babel-polyfill");
  }

  require("babel-register")(finalBabelConfiguration);
}
