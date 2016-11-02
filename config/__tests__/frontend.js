/**
 * Copyright 2013-present, Novivia, Inc.
 * All rights reserved.
 */

import getFrontendConfiguration from "../frontend";
import {oneLine} from "common-tags";

describe(
  "Frontend configuration",
  () => {
    const defaultConfiguration = getFrontendConfiguration();

    it(
      "returns a valid configuration by default",
      () => {
        expect(defaultConfiguration).toBeDefined();
        expect(Object.keys(defaultConfiguration).length).toBeGreaterThan(0);
      },
    );

    it(
      "returns a different configuration with a different 'targets' option",
      () => {
        // Specify a fictional browser just to validate that it it propagates
        // correctly to the configuration.
        const differentTargetsConfiguration = getFrontendConfiguration({
          targets: {
            noviviaBrowser: 1337,
          },
        });

        expect(differentTargetsConfiguration).not.toEqual(defaultConfiguration);
      },
    );

    it(
      oneLine`
        returns a different configuration with the 'useHotModuleReloading'
        option on
      `,
      () => {
        const noHMRConfiguration = getFrontendConfiguration({
          useHotModuleReloading: true,
        });

        expect(noHMRConfiguration).not.toEqual(defaultConfiguration);
      },
    );

    it(
      "returns a different configuration with the 'useRuntime' option off",
      () => {
        const noRuntimeConfiguration = getFrontendConfiguration({
          useRuntime: false,
        });

        expect(noRuntimeConfiguration).not.toEqual(defaultConfiguration);
      },
    );

    it(
      "propagates common options to the common configuration",
      () => {
        const differentCommonConfiguration = getFrontendConfiguration({
          convertFlowToComments: true,
        });

        expect(differentCommonConfiguration).not.toEqual(defaultConfiguration);
      },
    );
  },
);
