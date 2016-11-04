/**
 * Copyright 2013-present, Novivia, Inc.
 * All rights reserved.
 */

// eslint-disable-next-line filenames/match-exported
import getCommonConfiguration from "./common";

// "Frontend" includes everything that has a chance to get to the browser.
export default function getFrontendBabelConfiguration({
  useHotModuleReloading = false,

  // Keep filesize lower in the front-end by leveraging the Babel runtime by
  // default.
  useRuntime = true,
  ...commonSettings,
} = {}) {
  const frontendConfiguration = getCommonConfiguration({
    useRuntime,
    ...commonSettings,
  });

  // Enable Hot Module Reloading if requested.
  if (useHotModuleReloading) {
    // FIXME: Leverage new approach:
    // https://medium.com/@dan_abramov/hot-reloading-in-react-1140438583bf
    frontendConfiguration.plugins.unshift([
      require.resolve("babel-plugin-react-transform"),
      {
        factoryMethods: ["React.createClass"],
        transforms: [
          {
            imports: ["react"],
            locals: ["module"],
            transform: "react-transform-hmr",
          },

          // TODO: Make this work with the webpack-dev-server CLI.
          // {
          //   imports: ["react", "delicate-error-reporter"]
          //   transform: "react-transform-catch-errors",
          // },
        ],
      },
    ]);
  }

  return frontendConfiguration;
}
