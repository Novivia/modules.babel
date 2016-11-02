/**
 * Copyright 2013-present, Novivia, Inc.
 * All rights reserved.
 */

/**
 * Elementary in-memory require hook to be used in standalone fashion when
 * developing and testing this very module.
 */

module.exports = function localRequireHook() {
  require("babel-register")({
    ignore: [
      /node_modules/,
      /__tests__/,
    ],
    only: require("path").resolve(__dirname, ".."),
    plugins: [
      // FIXME: We need to include this for now because `stage-0` chokes on rest
      // spread syntax for some reason. See
      // https://github.com/babel/babel/pull/4755
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
