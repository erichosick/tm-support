# trkm

A [Lerna](https://lerna.js.org/) mono repo which contains:

* [object-json-path](./packages/object-json-path/README.md) - Using a small subset of [JSONpath](https://jsontostring.com/jsonpath/) features, object-json-path gets or sets a value on a javascript object.
* [cookie-obj](./packages/cookie-obj/README.md) - Converts the [Http cookie format](https://developer.mozilla.org/en-US/docs/web/api/document/cookie) (document.cookie) to a javascript object: the cookie name becomes the object property name.

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

## Development

Development requirements:

* Node + Yarn

```bash

# init all the projects
yarn

# continuously run tests
yarn test:watch

# run tests
yarn test

# build javascript library from typescript library
yarn build

# continuously build javascript library from typescript library
yarn build:watch

# publish all packages that have changed to npmjs.com
yarn publish:all
```

### Pushing Changes

```bash
# verify test run
yarn test:integration

# verify build works
yarn build

# make sure everything is commented, checked in and pushed into git
# TODO: Document code review process

# publish all packages that have changed
# you will need to have setup the account with npmjs.com
yarn publish:all

# enter the one-time password generated using 
# select correct version bump
```

### Adding a New Project

```bash
yarn lerna:create {package-name}
# Example yarn lerna:create wp-context
```

### Linking To Another Project

```bash
cd ./packages/{package-name}
yarn lerna add {package-name-linking-to}

# example
cd ./package/wp-context
yarn lerna add object-json-path
```

# TODO

* Add documentation on how to run tests across all packages.
