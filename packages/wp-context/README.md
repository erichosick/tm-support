# `wp-context`

TODO: Add documentation to this project.

`wp-context` is a small package that pulls values from different sources on a webpage (cookies, heading, web page parameters, etc. and place them in a json object for later processing.

Example Usage:

```javascript
const wpContextConfig = [
    {
      required: false,
      default: 'email',
      map_to: 'utm.medium',
      source: [
        {
          // try this source first
          type: 'param',
          name: 'utm_medium'
        },
        {
          // try this source next
          type: 'header',
          name: 'medium'
        },
        // finally use the default.
      ],
    },
    {
      required: true,
      map_to: 'utm.campaign',
      source: {
        type: 'param',
        name: 'utm_campaign'
      },
    }
  ]
;

const pageContext = wpContextBuild(wpContextConfig);

```

## Usage

```javascript
const wpContext = require('wp-context');

// TODO: DEMONSTRATE API
```
