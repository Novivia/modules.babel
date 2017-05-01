/**
 * Copyright 2013-present, Novivia, Inc.
 * All rights reserved.
 */

import getCommonConfiguration from "../common";
import {oneLine} from "common-tags";

describe(
  "Common configuration",
  () => {
    const defaultConfiguration = getCommonConfiguration();

    it(
      "returns a valid configuration by default",
      () => {
        expect(defaultConfiguration).toBeDefined();
        expect(Object.keys(defaultConfiguration).length).toBeGreaterThan(0);
      },
    );

    it(
      oneLine`
        returns a different configuration with the 'convertFlowToComments'
        option on
      `,
      () => {
        const flowCommentsConfiguration = getCommonConfiguration({
          convertFlowToComments: true,
        });

        expect(flowCommentsConfiguration).not.toEqual(defaultConfiguration);
      },
    );

    it(
      oneLine`
        returns a different configuration with the 'convertFlowToPropTypes'
        option off
      `,
      () => {
        const flowPropTypesConfiguration = getCommonConfiguration({
          convertFlowToPropTypes: false,
        });

        expect(flowPropTypesConfiguration).not.toEqual(defaultConfiguration);
      },
    );

    it(
      oneLine`
        returns a different configuration with the 'convertFlowToTypeCheck'
        option on
      `,
      () => {
        const flowTypeCheckConfiguration = getCommonConfiguration({
          convertFlowToTypeCheck: true,
        });

        expect(flowTypeCheckConfiguration).not.toEqual(defaultConfiguration);
      },
    );

    it(
      oneLine`
        returns a different configuration with the 'eliminateNonBuildingCode'
        option off
      `,
      () => {
        const eliminateNonBuildingCodeConfiguration = getCommonConfiguration({
          eliminateNonBuildingCode: false,
        });

        expect(eliminateNonBuildingCodeConfiguration)
        .not
        .toEqual(defaultConfiguration);
      },
    );

    describe(
      "experimental features",
      () => {
        it(
          oneLine`
            returns a different configuration with the 'includeExperiments'
            option off
          `,
          () => {
            const noExperimentsConfiguration = getCommonConfiguration({
              includeExperiments: false,
            });

            expect(noExperimentsConfiguration)
            .not
            .toEqual(defaultConfiguration);
          },
        );

        it(
          oneLine`
            returns a different configuration with the 'includeExperiments'
            option set to a different stage
          `,
          () => {
            const stage1ExperimentsConfiguration = getCommonConfiguration({
              includeExperiments: 1,
            });

            expect(stage1ExperimentsConfiguration)
            .not
            .toEqual(defaultConfiguration);
          },
        );

        it(
          oneLine`
            throws when the 'includeExperiments' option is set to an invalid
            stage
          `,
          () => {
            const invalidExperiments = () => getCommonConfiguration({
              includeExperiments: 4,
            });

            expect(invalidExperiments).toThrowError(/includeExperiments/);
          },
        );
      },
    );

    it(
      oneLine`
        returns a different configuration with the 'includeLegacyDecorators'
        option off"
      `,
      () => {
        const noDecoratorsConfiguration = getCommonConfiguration({
          includeLegacyDecorators: false,
        });

        expect(noDecoratorsConfiguration).not.toEqual(defaultConfiguration);
      },
    );

    it(
      oneLine`
        returns a different configuration with the 'includeModuleExports'
        option off"
      `,
      () => {
        const noExportsConfiguration = getCommonConfiguration({
          includeModuleExports: false,
        });

        expect(noExportsConfiguration).not.toEqual(defaultConfiguration);
      },
    );

    it(
      "returns a different configuration with the 'includeReact' option off",
      () => {
        const noReactConfiguration = getCommonConfiguration({
          includeReact: false,
        });

        expect(noReactConfiguration).not.toEqual(defaultConfiguration);
      },
    );

    it(
      "returns a different configuration with the 'useRuntime' option on",
      () => {
        const useRuntimeConfiguration = getCommonConfiguration({
          useRuntime: true,
        });

        expect(useRuntimeConfiguration).not.toEqual(defaultConfiguration);
      },
    );
  },
);
