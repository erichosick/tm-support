/**
 * Maps a json path to a value.
 */
export interface JsonPathValue {
  /**
   * A jsonPath. Note: We currently only support the '.' scope operator of
   * the jsonPath.
   */
  path: string

  /**
   * The value associated with the jsonPath. Used in the case of adding the
   * value to a json object
   */
  value: unknown
}

export type JsonPathValues = JsonPathValue[];

/**
 * Adds a value to an object given a JSONPath.
 *
 * If the path provided in jsonPath doesn't exist in the jsonObject, then the
 * object is built out. The final path element is then created setting it's
 * value to value. If a jsonPath resolves to a primitive (string, number, array)
 * etc. when there is already an object, an error is thrown. For example, if
 * a prior call to addValueToObject of user.name had a value of 'A User' and
 * the next call to addValueToObject of user.name.first is 'A' then an error
 * is thrown.
 *
 * NOTE:
 *  * We currently only support a very simplified jsonPath of '.' scope only.
 *    Example: user.age
 *
 * @param jsonObject The object we're adding the value to.
 * @param jsonPathValues An object of, or array of, JsonPathValues. Every
 * path/value pairing is used to build out the jsonObject.
 *
 * Example:
 *   const anObject = {};
 *   insertIntoObject(anObject, { path: 'user.age', value: 23 }));
 */
export const insertIntoObject = (
  jsonObject: unknown,
  jsonPathValues: JsonPathValue | JsonPathValues,
): unknown => {
  // Simplify code logic below
  const jsonPaths = Array.isArray(jsonPathValues)
    ? jsonPathValues : [jsonPathValues];
  const currentPath = [];
  for (const jsonPath of jsonPaths) {
    if (jsonPath.path === '') {
      throw Error('Path can not be empty.');
    }
    const properties = jsonPath.path.split('.');
    let current: any = jsonObject;
    // 1. Build out the object as needed up to the last
    // property (properties.length - 1)
    for (let i = 0; i < (properties.length - 1); i += 1) {
      const name = properties[i];
      currentPath.push(name);
      if (!(name in current)) {
        current[name] = {};
      }
      current = current[name];
    }
    if (typeof current !== 'object') {
      throw TypeError(`Unable to add a value to path '${jsonPath.path}' because the value at '${currentPath.join('.')}' is a primitive when an object was expected.`);
    }
    // 2. Set the final property unless it is not an object.
    current[properties[properties.length - 1]] = jsonPath.value;
  }

  return jsonObject;
};

/**
 * Returns a value from an object given a JSON path.
 * @param jsonObject The object we're reading the values from.
 * @param path The JSONpath to the value.
 * @returns The value found from the object.
 */
export const getFromObject = (
  jsonObject: unknown,
  path: string,
) => {
  const properties = path.split('.');
  let current: any = jsonObject;
  const currentPath = [];
  for (let i = 0; i < (properties.length - 1); i += 1) {
    const name = properties[i];
    if (current[name]) {
      current = current[name];
    } else {
      throw Error(`Unable to resolve path. Object did not have a property '${name}' at path '${currentPath.join('.')}'.`);
    }
    currentPath.push(name);
  }
  const propertyName = properties[properties.length - 1];

  if (typeof current !== 'object') {
    throw TypeError(`Unable to get a value from path '${path}' because the value at '${currentPath.join('.')}' is a primitive when an object was expected.`);
  } else if (!(Object.prototype.hasOwnProperty.call(current, propertyName))) {
    throw Error(`Unable to get a value from path '${path}' because the object at '${currentPath.join('.')}' did not have property ${propertyName}.`);
  }
  return current[propertyName];
};

// build an admin using one path/value at a time.
const adminUser = {};
insertIntoObject(adminUser, { path: 'fullName', value: 'Happy Admin' });
insertIntoObject(adminUser, { path: 'privileges', value: ['admin', 'reader'] });

// build a user providing multiple path/values at the same time.
const user = {};
insertIntoObject(user, [
  { path: 'name.first', value: 'Happy' },
  { path: 'name.last', value: 'User' },
]);

const value = getFromObject(user, 'name.first');

console.log(value);
