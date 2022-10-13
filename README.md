# tm-support

A [Lerna](https://lerna.js.org/) mono repo which contains:

* [object-json-path](./packages/object-json-path/README.md) - Using a small subset of [JSONpath](https://jsontostring.com/jsonpath/) features, object-json-path gets or sets a value on a javascript object.

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
