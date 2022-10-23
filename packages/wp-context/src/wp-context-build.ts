import Cookies from 'js-cookie';
import { insertIntoObject } from 'object-json-path';

import { WpContextSource, WpContextConfig, WpContextConfigs } from './types';
import uuidGenerate from './uuid-generate';

const valueFromSource = (source: WpContextSource): string | undefined => {
  let result;
  const location = window.location as unknown as { [key: string]: string | undefined };
  switch (source.type) {
    case 'cookie':
      // returns undefined if cookie not found
      result = Cookies.get(source.name);
      break;
    case 'url':
      result = window.location.href;
      break;
    case 'param':
      // https://makersaid.com/blog/get-url-parameters-javascript/
      result = (new URLSearchParams(window.location.search)).get(source.name);
      break;
    case 'referrer':
      result = document.referrer;
      break;
    case 'local_storage':
      // https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
      result = localStorage.getItem(source.name);
      break;
    case 'uuid':
      result = uuidGenerate();
      break;
    case 'location':
      return location[source.name];
    /* istanbul ignore next */ // since source.type is an enumeration
    default:
      break;
  }
  return result === null ? undefined : result;
};

const wpContextBuild = (config: WpContextConfigs | WpContextConfig): unknown => {
  // if a single WpContextConfig is provided then let's just wrap it in
  // an array so we can re-use the code below.
  const configs = Array.isArray(config) ? config : [config];
  const result: unknown = {};

  configs.forEach((element: WpContextConfig) => {
    let finalValue = element.default;
    const sources = Array.isArray(element.source) ? element.source : [element.source];

    if (sources) {
      for (const source of sources) {
        finalValue = valueFromSource(source);
        if (undefined !== finalValue) {
          break;
        }
      }

      if (element.required === true && finalValue === undefined) {
        // eslint-disable-next-line no-console
        console.error(`Context configuration mapping to ${element.mapTo} required a value but none was found. Set a default or set required to false.`);
      }
    }
    finalValue = finalValue === undefined ? element.default : finalValue;
    insertIntoObject(result, { path: element.mapTo, value: finalValue });
  });

  return result;
};

export default wpContextBuild;
