/**
 * Copyright 2013-present, Novivia, Inc.
 * All rights reserved.
 */

// eslint-disable-next-line filenames/match-exported
import getCommonConfiguration from "./common";
import {major as getMajorVersion} from "semver";

// "Backend" usually includes things like services, command-line tools and
// backend-specific modules.
export default function getBackendBabelConfiguration({
  eliminateNonBuildingCode = true,
  nodeTargetVersion = getMajorVersion(process.version),
  ...commonSettings,
} = {}) {
  const backendConfiguration = getCommonConfiguration(commonSettings);

  // All ratified ECMAScript specifications, targeting a specific version of
  // Node.
  backendConfiguration.presets.unshift([
    require.resolve("babel-preset-env"),
    {
      targets: {
        node: nodeTargetVersion,
      },
    },
  ]);

  if (eliminateNonBuildingCode) {
    backendConfiguration.plugins.push(
      [
        require.resolve("babel-plugin-minify-replace"),
        {
          replacements: [
            // "global.__BUILDING__" --> "true"
            {
              identifierName: "global",
              member: "__BUILDING__",
              replacement: {
                type: "booleanLiteral",
                value: true,
              },
            },
          ],
        },
      ],

      require.resolve("babel-plugin-minify-dead-code-elimination"),
    );
  }

  return backendConfiguration;
}
