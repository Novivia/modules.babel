# Versions

## v1.0.0 - (15/12/2016)

* Updated dependencies:
    * `@novivia/tester` to v1.
    * `babel-preset-env` to v1.


## v0.1.0 - (10/12/2016)

* Updated dependencies:
    * `@novivia/tester` to v0.1.
    * `babel-plugin-flow-react-proptypes` to v0.18.
    * `babel-preset-env` to v0.0.9.


## v0.0.5 - (24/11/2016)

* Updated dependencies:
    * `babel-plugin-flow-react-proptypes` to v0.17.
    * `babel-preset-env` to v0.0.8.


## v0.0.4 - (04/11/2016)

* Added missing `react-transform-hmr` dependency.
* Updated `@novivia/build-module` dependency to v0.5.


## v0.0.3 - (04/11/2016)

* All configurations can now benefit from the `eliminateNonBuildingCode` option,
  not just the backend one.
* Eliminated the `nodeTargetVersion` option in the backend configuration in
  favor of the more generic `targets` one in the common configuration. Thus, you
  can now easily target a specific Node version OR a set of web browsers.
* You can now convert flow annotations to best-effort runtime checks using the
  `convertFlowToTypeCheck` option when getting a configuration.
* Added the `babel-plugin-typecheck` dependency.


## v0.0.2 - (02/11/2016)

* Now exposing a utility to easily retrieve a Babel directory ignore RegEx when
  in development.


## v0.0.1 - (02/11/2016)

* Initial version.
