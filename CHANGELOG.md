# Versions

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
