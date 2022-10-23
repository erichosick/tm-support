/**
 * Defining an object interface with string keys and string values.
 * Example:
 * {
 *   "userName": "User",
 *   "userAge": "42",
 * }
 */
export interface ObjStrKeyVal {
  [key: string]: string
}

export type alterName = (info: string) => string;

// THOUGHTS: Log a warning if invalid cookies are ignored. Perhaps write a
// similar function that can provide in-depth debug information.

/**
 * Converts a cookie string as described by https://developer.mozilla.org/en-US/docs/web/api/document/cookie
 * to an object. WARNING: Cookie names are case sensitive along with javascript
 * object properties.
 * @param cookies A string containing zero or more cookies.
 * @param alter - When provided, enables converting a cookie name before using
 * the cookie name as the object property name.
 * @returns An object whose properties are the properties of all cookies in the 
 * cookies string and value is the value of the cookie.
 * 
 */
export const cookiesToObj = (
  cookies: string,
  alter: alterName | null = null
): ObjStrKeyVal => {
  const result: ObjStrKeyVal = {};
  for (let cookie of cookies.split(';')) {
    // cases where the cookie is empty. For example when cookies = ';;;;'
    if (cookie !== '') {
      const cookieParts = cookie.split('=');
      if (cookieParts.length === 2) {
        const decodedPropertyName = decodeURIComponent(cookieParts[0]);
        const finalPropertyName = alter ? alter(decodedPropertyName) : decodedPropertyName;
        // NOTE: It should not be possible for document.cookie to have more than
        // one cookie of the same name unless we are converting the property names
        // to lower case.
        if (result[finalPropertyName] !== undefined) {
          throw new Error(`Cookies had more than one cookie with a property named '${finalPropertyName}'.`);
        }
        result[finalPropertyName] = decodeURIComponent(cookieParts[1]);
      } // else ignore the invalid cookie.
    }
  }
  return result;
}

