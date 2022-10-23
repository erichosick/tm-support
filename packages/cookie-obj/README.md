# `cookies-to-obj`

Converts the [Http cookie format](https://developer.mozilla.org/en-US/docs/web/api/document/cookie) (document.cookie) to a javascript object: the cookie name becomes the object property name.

## Features

* A 100% typescript library.
* Leverages `decodeURIComponent` for both cookie name and cookie value.
* Alter the cookie name before using the name as an object property: lowerPascalCase, lowerCase, etc.

## Usage

### `cookiesToObj`

Converts a cookie string, often returned by document.cookie ([more info](https://developer.mozilla.org/en-US/docs/web/api/document/cookie)) to an object. WARNING: Cookie names are case sensitive along with javascript object properties

* @param cookies - A string containing zero or more cookies as defined by [Http cookie format](https://developer.mozilla.org/en-US/docs/web/api/document/cookie).
* @param alter - When provided, enables converting a cookie name before using the cookie name as the object property name.
* @returns - An object whose properties are the properties of all cookies in the cookies string and value is the value of the cookie.

```typescript
import { cookiesToObj } from '../src/cookies-to-obj';

const cookies = cookiesToObj(document.cookie);

// convert cookie name to lowercase

const toLowerCase = (input: string) => {
  return input.toLowerCase();
}

const cookies2 = cookiesToObj(
  'ENABLED=true;updated=false;',
  toLowerCase
);

// cookies2
{
  enabled: true,
  updated: false,
}
```

Note: Ignores invalid cookie definitions: cookieName=cookieValue

## Intent

* No Emitted Javascript - The intent is to import this typescript library into a typescript project: compiling to Javascript occurring within the project.

## Development

See the [monorepo readme](https://www.github.com/erichosick/tm-support).

## License

Licensed under [MIT](./LICENSE.md).
