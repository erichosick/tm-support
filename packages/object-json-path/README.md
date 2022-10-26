# **object-json-path**

Using a small subset of [JSONpath](https://jsontostring.com/jsonpath/) features, **object-json-path** gets or sets a value in a JSON object.

## Features

* A 100% typescript library.

## Usage

Construct and access an object using JSONPath. The two functions provided are:

* `insertIntoObject` - Inserts a value to an object given a JSON path.
* `getFromObject` - Returns the value from a JSON path.

### `insertIntoObject`

Inserts a value to an object given a JSON path.

```typescript
import { insertIntoObject } from 'object-json-path';

// build an admin using one path/value at a time.
const adminUser = {};
insertIntoObject(adminUser, { path: 'fullName', value: 'Happy Admin' });
insertIntoObject(adminUser, { path: 'privileges', value: ['admin', 'reader'] });

// Resulting adminUser value
{
  fullName: 'Happy Admin',
  privileges: [ 'admin', 'reader' ]
}

// build a user providing multiple path/values at the same time.
const user = {};
insertIntoObject(user, [
  { path: 'name.first', 'Happy'},
  { path: 'name.last', 'User'}
]);

// Resulting user value
{
  name: {
    first: 'Happy',
    last: 'User'
  }
}
```

### `getFromObject`

Returns a value from an object given a JSON path.

```typescript
import { getFromObject } from 'object-json-path';


const user = {
  name: {
    first: 'Happy',
    last: 'User'
  }
};

const value = getFromObject(user, 'name.first');

```

## Intent

The intent is to compose objects whose shapes are not known ahead of time. The following code uses javascript object composition:

```typescript
const firstName = 'Happy';
const lastName = 'User';

const user = {
  name: {
    first: firstName,
    last: lastName,
  }
}
```

However, this requires knowledge of the object's shape at development time.

## Example Usage

We want to build an object based on web page context dynamically. We pull context from different sources on the page, such as HTML parameters, cookies, local storage, etc., and store them in an object. Instead of composing the final object using javascript, we define the mapping between a given context value and the object using JSON. The JSON is passed to a builder, wp-context for example, which uses this library to get and set values to a javascript object.

## Development

See the [monorepo readme](https://www.github.com/erichosick/trkm).

## License

Licensed under [MIT](./LICENSE.md).
