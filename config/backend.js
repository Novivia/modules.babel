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
  targets = {
    node: getMajorVersion(process.version),
  },
  ...commonSettings,
} = {}) {
  const backendConfiguration = getCommonConfiguration({
    targets,
    ...commonSettings,
  });

  return backendConfiguration;
}
