# Change Log

All notable changes to this project will be documented in this file.
If a version is not mentioned, it means that the change is not important enough to be mentioned,
and no migration is needed.

This project adheres to [Semantic Versioning](http://semver.org/).

## 4.0.1

The package has been renamed from jikan-api-lightweight-client to @lightweight-clients/jikan-api-lightweight-client.

### How to upgrade

- Update the package name in your package.json file.
- Rework calls to pass path parameter not in an object, but as a separate parameter.

Details:

- A new version of the schema is used. There are slightly different types for the `promos` method.
- Path parameters are now passed as separate parameters instead of an object.
- The package now has a new version of the generator.
- The new version uses typed imports.
- The `raw-types.ts` file saves as is, without any changes (except for formatting).
- Customized types are now exported from the `simple-types` module.
- Content of the `simple-types` module is now exported from the main module.
- Simple-types module preserves the same naming convention as before.
- GitHub Actions workflow now uses schemas from the `lightweight-clients/schemas` project.


## 4.0.0.0

Initial release of the new version 4.0.0.
