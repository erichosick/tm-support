import './globals';

/**
 * Generates a uuid using createObjectUrl. The uuid returned is a string. Use
 * the https://www.npmjs.com/package/uuid library to convert the string to a
 * uuid.
 * @returns A string uuid.
 */
const uuidGenerate = (): string => URL.createObjectURL(new Blob()).split('/')[3];

const tm = {
  uuidGenerate,
};

// window.tm = tm;

export default tm;