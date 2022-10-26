/**
 * Generates a uuid using createObjectUrl. The uuid returned is a string. Use
 * the https://www.npmjs.com/package/uuid library to convert the string to a
 * uuid.
 * @returns A string uuid.
 */

const uuidGenerate = (): string => {
  // // generate a url using createObjectURL
  // // see https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
  // const url = URL.createObjectURL(new Blob());
  // // need to revoke the url now.
  // // See https://developer.mozilla.org/en-US/docs/Web/API/URL/revokeObjectURL
  // URL.revokeObjectURL(url);

  // // pull out the uuid from the url which is at the end of the url. Example
  // // result from createObjectUrl:
  // // blob:https://abhishekdutta.org/e54dbbe2-14cd-492f-bb12-1606112c1b41'
  // return url.substring(url.lastIndexOf("/") + 1);
  return crypto.randomUUID();
}

export default uuidGenerate;