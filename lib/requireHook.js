/**
 * Copyright 2013-present, Novivia, Inc.
 * All rights reserved.
 */

import getBackendConfiguration from "../config/backend";
import getConfigurationFromPackage from "./getConfigurationFromPackage";
import getIgnoreRegex from "./getIgnoreRegex";

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
  const configurationFromPackage = getConfigurationFromPackage({
    module,
    rootDirectory,
  });

  const babelConfiguration = getBackendConfiguration({
    convertFlowToTypeCheck: true,
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
  finalBabelConfiguration.ignore.push(getIgnoreRegex({
    includeDevScopes: configurationFromPackage.includeDevScopes,
    module,
    rootDirectory,
  }));

  if (useJSON5) {
    require("json5/lib/require");
  }

  /* istanbul ignore if */
  if (usePolyfill) {
    require("babel-polyfill");
  }

  require("babel-register")(finalBabelConfiguration);
}
