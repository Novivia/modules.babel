/**
 * Copyright 2013-present, Novivia, Inc.
 * All rights reserved.
 */

import getIgnoreRegex from "../../ignoreRegex";
import {oneLine} from "common-tags";

describe(
  "ignore RegEx",
  () => {
    describe(
      "in development",
      () => {
        let NODE_ENV;
        beforeEach(() => {
          NODE_ENV = process.env.NODE_ENV;
          delete process.env.NODE_ENV;
        });
        afterEach(() => (process.env.NODE_ENV = NODE_ENV));

        it(
          oneLine`
            returns a valid configuration by default, including Novivia packages
          `,
          () => {
            const defaultConfiguration = getIgnoreRegex();

            expect(defaultConfiguration).toEqual(
              /node_modules[\\/](?!@(novivia)[\\/])/,
            );
          },
        );

        it(
          "takes into account custom package scopes",
          () => {
            const customConfiguration = getIgnoreRegex({
              includeDevScopes: ["my-test"],
            });

            expect(customConfiguration).toEqual(
              /node_modules[\\/](?!@(novivia|my-test)[\\/])/,
            );
          },
        );
      },
    );

    describe(
      "in production",
      () => {
        let NODE_ENV;
        beforeEach(() => {
          NODE_ENV = process.env.NODE_ENV;
          delete process.env.NODE_ENV;
          process.env.NODE_ENV = "production";
        });
        afterEach(() => (process.env.NODE_ENV = NODE_ENV));

        it(
          oneLine`
            returns a valid configuration by default, excluding Novivia packages
          `,
          () => {
            const defaultConfiguration = getIgnoreRegex();

            expect(defaultConfiguration).toEqual(
              /node_modules/,
            );
          },
        );

        it(
          "ignores custom package scopes",
          () => {
            const customConfiguration = getIgnoreRegex({
              includeDevScopes: ["my-test"],
            });

            expect(customConfiguration).toEqual(
              /node_modules/,
            );
          },
        );
      },
    );
  },
);
