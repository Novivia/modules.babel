/**
 * Copyright 2013-present, Novivia, Inc.
 * All rights reserved.
 */

import getBackendConfiguration from "../backend";
import {major as getMajorVersion} from "semver";

describe(
  "Backend configuration",
  () => {
    const defaultConfiguration = getBackendConfiguration();

    it(
      "returns a valid configuration by default",
      () => {
        expect(defaultConfiguration).toBeDefined();
        expect(Object.keys(defaultConfiguration).length).toBeGreaterThan(0);
      },
    );

    it(
      "propagates common options to the common configuration",
      () => {
        const differentCommonConfiguration = getBackendConfiguration({
          convertFlowToComments: true,
        });

        expect(differentCommonConfiguration).not.toEqual(defaultConfiguration);
      },
    );

    describe(
      "Node version",
      () => {
        it(
          "uses current version by default",
          () => {
            const currentNodeVersion = getMajorVersion(process.version);
            const babelEnvPreset = defaultConfiguration.presets.find(preset => {
              if (!Array.isArray(preset) || !preset.length) {
                return false;
              }

              if (!preset[0].includes("babel-preset-env")) {
                return false;
              }

              const presetConfig = preset[1];

              if (!presetConfig || !Object.keys(presetConfig).length) {
                return false;
              }

              if (!presetConfig.targets || !presetConfig.targets.node) {
                return false;
              }

              return true;
            });

            expect(babelEnvPreset).toBeDefined();
            expect(babelEnvPreset[1].targets.node).toEqual(currentNodeVersion);
          },
        );

        it(
          "returns a different configuration with a different 'targets' option",
          () => {
            // Use a version of Node that never existed just to ensure it's
            // different from the current version and that it propagates
            // correctly to the configuration.
            const differentNodeVersionConfiguration = getBackendConfiguration({
              targets: {
                node: 1,
              },
            });

            expect(differentNodeVersionConfiguration)
            .not
            .toEqual(defaultConfiguration);
          },
        );
      },
    );
  },
);
