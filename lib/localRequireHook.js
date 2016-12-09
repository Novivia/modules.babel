/**
 * Copyright 2013-present, Novivia, Inc.
 * All rights reserved.
 */

/**
 * Elementary in-memory require hook to be used in standalone fashion when
 * developing and testing this very module.
 */

module.exports = function localRequireHook() {
  const parentPath = require("path").resolve(__dirname, "..");

  require("babel-register")({
    only: new RegExp(`${parentPath}(?!.*?(?:node_modules|__tests__))`),
    plugins: [
      // We need to include this for now because it's not in ECMAScript yet.
      require.resolve("babel-plugin-syntax-object-rest-spread"),
      require.resolve("babel-plugin-transform-object-rest-spread"),

      // Keep Babel 5 behavior with require calls.
      // See https://github.com/babel/babel/issues/2212
      require.resolve("babel-plugin-add-module-exports"),
    ],
    presets: [
      require.resolve("babel-preset-es2015"),
    ],
  });

  delete require.cache[require.resolve("babel-register")];
};
