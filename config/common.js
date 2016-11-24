/**
 * Copyright 2013-present, Novivia, Inc.
 * All rights reserved.
 */

/* eslint-disable filenames/match-exported */

// eslint-disable-next-line no-magic-numbers
const BABEL_PRESET_STAGES = [0, 1, 2, 3];

export default function getCommonBabelConfiguration({
  convertFlowToComments = false,
  convertFlowToPropTypes = true,
  convertFlowToTypeCheck = false,
  eliminateNonBuildingCode = true,

  // Don't include if false, include if one of the experimental ECMAScript
  // stages.
  includeExperiments = 0,
  includeReact = true,

  // Target everything by default, will compile everthing down to ES5.
  targets = {},
  useRuntime = false,
} = {}) {
  const configuration = {
    plugins: [
      // FIXME: We need to include this for now because the plugins below
      // seem to choke on rest spread syntax for some reason.
      require.resolve("babel-plugin-syntax-object-rest-spread"),
      require.resolve("babel-plugin-transform-es2015-destructuring"),
      require.resolve("babel-plugin-transform-es2015-parameters"),
      require.resolve("babel-plugin-transform-object-rest-spread"),

      // Keep Babel 5 behavior with require calls.
      // See https://github.com/babel/babel/issues/2212
      require.resolve("babel-plugin-add-module-exports"),

      // Babel 5 era decorators.
      // FIXME: Remove once
      // https://github.com/babel/babel/issues/2645 is addressed.
      require.resolve("babel-plugin-transform-decorators-legacy"),
    ],
    presets: [
      // All ratified ECMAScript specifications, targeting a specific version
      // of Node or a specific set of browsers.
      [require.resolve("babel-preset-env"), {targets}],
    ],
  };

  // Optional plugins.
  if (useRuntime) {
    // Use the Babel runtime if requested.
    configuration.plugins.unshift(
      require.resolve("babel-plugin-transform-runtime"),
    );
  }

  if (convertFlowToComments) {
    configuration.plugins.push(
      require.resolve("babel-plugin-transform-flow-comments"),
    );
  }

  if (convertFlowToPropTypes) {
    configuration.plugins.push(
      require.resolve("babel-plugin-flow-react-proptypes"),
    );
  }

  if (convertFlowToTypeCheck) {
    configuration.plugins.push(
      require.resolve("babel-plugin-typecheck"),
    );
  }

  // Optional presets.
  if (BABEL_PRESET_STAGES.includes(includeExperiments)) {
    // Support for very experimental features, subject to changes.
    configuration.presets.push(
      require.resolve(`babel-preset-stage-${includeExperiments}`),
    );
  } else if (includeExperiments !== false) {
    throw new Error("Invalid value for the 'includeExperiments' setting.");
  }

  if (includeReact) {
    // React and JSX support.
    configuration.presets.push(
      require.resolve("babel-preset-react"),
    );
  }

  if (eliminateNonBuildingCode) {
    configuration.plugins.push(
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

  return configuration;
}
