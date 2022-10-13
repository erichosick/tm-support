/**
 * Maps a json path to a value.
 */
export interface JsonPathValue {
    /**
     * A jsonPath. Note: We currently only support the '.' scope operator of
     * the jsonPath.
     */
    path: string;
    /**
     * The value associated with the jsonPath. Used in the case of adding the
     * value to a json object
     */
    value: unknown;
}
export declare type JsonPathValues = JsonPathValue[];
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
export declare const insertIntoObject: (jsonObject: unknown, jsonPathValues: JsonPathValue | JsonPathValues) => unknown;
/**
 * Returns a value from an object given a JSON path.
 * @param jsonObject The object we're reading the values from.
 * @param path The JSONpath to the value.
 * @returns The value found from the object.
 */
export declare const getFromObject: (jsonObject: unknown, path: string) => any;
