import {
  WpDestination, WpDestinations, WpFormDestination, WpFormFieldDestination
} from './types';

import { getFormElement } from './wp-html';

import { getFromObject } from 'object-json-path';

export const wpSetFormInput = (
  form: HTMLFormElement,
  input: WpFormFieldDestination,
  value: string,
) => {
  const formElements = form.getElementsByTagName(input.destination.elementType);
  let inputElement;
  let attribute;
  const attribValue = input.destination.attributeValue.toLowerCase();
  for (const element of formElements) {
    switch (input.destination.attributeName) {
      case 'id':
        if (element.id.toLowerCase() === attribValue) {
          inputElement = element;
        }
        break;
      case 'name':
        if (element instanceof HTMLFormElement) {
          if (element.name.toLowerCase() === attribValue) {
            inputElement = element;
          }
        }
        // else we are unable to whatever element we got from that was on
        // on the from using name
        break;
      default:
        attribute = element.getAttribute(input.destination.attributeName);
        if (attribute && attribute.toLowerCase() === attribValue) {
          inputElement = element;
        }
        break;
    }
    if (inputElement) {
      break;
    }
  }

  if (inputElement !== undefined) {
    inputElement.setAttribute('value', value);
  } else {
    throw Error(`Error: Unable to find the form element named ${input.destination.attributeValue} on form using attribute ${input.destination.attributeName}`);
  }
};

const wpFormApply = (context: unknown, formDestination: WpFormDestination) => {
  const form = getFormElement(formDestination.form);
  const formInputFields = Array.isArray(formDestination.formInput)
    ? formDestination.formInput : [formDestination.formInput];
  for (const input of formInputFields) {
    const value = getFromObject(context, input.pullFrom);
    wpSetFormInput(form, input, value);
  }
};

const wpContextApply = (
  context: unknown,
  apply: WpDestination | WpDestinations
): void => {
  // if a single WpContextApply is provided then let's just wrap it in
  // an array so we can re-use the code below.
  const applies = Array.isArray(apply) ? apply : [apply];

  for (const item of applies) {
    if (Object.prototype.hasOwnProperty.call(item, 'form')) {
      wpFormApply(context, item as WpFormDestination);
    }
  }
};

export default wpContextApply;

// window.tm.html.getFormElement({elementType: 'form', attributeValue: 'gform_3', attributeName: 'id_or_name'});
// window.tm.html.getFormElement({elementType: 'form', attributeName: 'tag'});


// export const formMapping = {
//   form: {
//     elementType: 'form',
//     attributeName: 'id',
//     attributeValue: '_form_634736BD24084_',
//   },
//   formInput: [
//     {
//       pullFrom: 'utm.source',
//       destination: {
//         elementType: 'input',
//         attributeName: 'data-name',
//         attributeValue: 'lastutmsource',
//       },
//     },
//     {
//       pullFrom: 'utm.medium',
//       destination: {
//         elementType: 'input',
//         attributeName: 'data-name',
//         attributeValue: 'lastutmmedium',
//       },
//     },
//     {
//       pullFrom: 'utm.campaign',
//       destination: {
//         elementType: 'input',
//         attributeName: 'data-name',
//         attributeValue: 'lastutmcampaign',
//       },
//     },
//     {
//       pullFrom: 'utm.term',
//       destination: {
//         elementType: 'input',
//         attributeName: 'data-name',
//         attributeValue: 'lastutmterm',
//       },
//     },
//     {
//       pullFrom: 'utm.utm_content',
//       destination: {
//         elementType: 'input',
//         attributeName: 'data-name',
//         attributeValue: 'lastutmcontent',
//       },
//     },
//     {
//       pullFrom: 'utm.id',
//       destination: {
//         elementType: 'input',
//         attributeName: 'data-name',
//         attributeValue: 'lastutmid',
//       },
//     },
//     {
//       pullFrom: 'ad.adset_id',
//       destination: {
//         elementType: 'input',
//         attributeName: 'data-name',
//         attributeValue: 'lastadsetid',
//       },
//     },
//     {
//       pullFrom: 'ad.ad_id',
//       destination: {
//         elementType: 'input',
//         attributeName: 'data-name',
//         attributeValue: 'lastadid',
//       },
//     },
//     {
//       pullFrom: 'document.origin',
//       destination: {
//         elementType: 'input',
//         attributeName: 'data-name',
//         attributeValue: 'lastlpurl',
//       },
//     },
//     {
//       pullFrom: 'document.search',
//       destination: {
//         elementType: 'input',
//         attributeName: 'data-name',
//         attributeValue: 'lastlpparams',
//       },
//     },
//     {
//       pullFrom: 'document.referrer',
//       destination: {
//         elementType: 'input',
//         attributeName: 'data-name',
//         attributeValue: 'lasttmreferer',
//       },
//     },
//     {
//       pullFrom: 'event.event_id',
//       destination: {
//         elementType: 'input',
//         attributeName: 'data-name',
//         attributeValue: 'lasttmeventid',
//       },
//     },
//   ],
// };

/*

let context = window.tm.wpContextBuild(window.tm.defaults.tmContextConfigDefault);

window.tm.wpContextApply(context, formMapping);

*/

// let form = document.forms[0];
// const formField = {
//   pullFrom: 'utm.source',
//   destination: {
//     elementType: 'input',
//     attributeName: 'data-name',
//     attributeValue: 'lastutmsource',
//   },
// };
// window.tm.support.wpSetFormInput(form, formField);

// let context = window.tm.wpContextBuild(window.tm.defaults.tmContextConfigDefault);
// window.tm.wpContextApply(context, formMapping);
