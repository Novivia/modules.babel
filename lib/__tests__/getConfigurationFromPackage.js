/**
 * Copyright 2013-present, Novivia, Inc.
 * All rights reserved.
 */

import {
  FIXTURES_PATH,
} from "./utils";
import getConfigurationFromPackage from "../getConfigurationFromPackage";
import {join as joinPath} from "path";

describe(
  "getting configuration from package",
  () => {
    const defaultConfiguration = getConfigurationFromPackage();

    it(
      "returns a valid configuration by default",
      () => {
        // This module doesn't have a "novivia-babel" configuration so this
        // should be an empty object.
        expect(defaultConfiguration).toEqual({});
      },
    );

    it(
      "returns the correct configuration from an existing package",
      () => {
        const specificConfiguration = getConfigurationFromPackage({
          rootDirectory: joinPath(
            FIXTURES_PATH,
            "requireHook",
            "basicModule",
          ),
        });

        expect(specificConfiguration).toEqual({
          includeDevScopes: ["fake-scope-working-test"],
        });
      },
    );
  },
);
