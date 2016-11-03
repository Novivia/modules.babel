/**
 * Copyright 2013-present, Novivia, Inc.
 * All rights reserved.
 */

import getConfigurationFromPackage from "./getConfigurationFromPackage";

export default function getIgnoreRegex({
  includeDevScopes,
  module,
  rootDirectory,
} = {}) {
  if (
    // FIXME: Replace with the proper utility once the utility module is out
    // there.
    process.env.NODE_ENV !== "production"
  ) {
    if (!includeDevScopes) {
      const configurationFromPackage = getConfigurationFromPackage({
        module,
        rootDirectory,
      });

      includeDevScopes = configurationFromPackage.includeDevScopes || [];
    }

    return new RegExp(`node_modules[\\/](?!@(${[
      "novivia",
      ...includeDevScopes,
    ].join("|")})/)`);
  }

  return /node_modules/;
}
