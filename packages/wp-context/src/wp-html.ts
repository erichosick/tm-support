import {
  WpHtmlElement,
} from './types';

export const getElementFromElements = (
  htmlElement: WpHtmlElement,
): Element => {
  let result;
  switch (htmlElement.attributeName) {
    case 'name':
      result = document.getElementsByName(htmlElement.attributeValue);
      break;
    case 'class':
      result = document.getElementsByClassName(htmlElement.attributeValue);
      break;
    case 'tag':
      result = document.getElementsByTagName(htmlElement.elementType);
      break;
    default:
      throw Error(`Unsupported attribute name ${htmlElement.attributeName}`);
  }
  if (result.length > 1) {
    throw Error(`Error: More than one html element of tag type ${htmlElement.elementType} named ${htmlElement.attributeValue} was found while searching using ${htmlElement.attributeName}.`);
  } else if (result.length === 0) {
    throw Error(`Error: No html element of tag type ${htmlElement.elementType} named ${htmlElement.attributeValue} was found while searching using ${htmlElement.attributeName}.`);
  }
  // eslint-disable-next-line prefer-destructuring
  return result[0];
};

export const getElement = (htmlElement: WpHtmlElement): Element => {
  let result = null;
  switch (htmlElement.attributeName) {
    case 'id':
      result = document.getElementById(htmlElement.attributeValue);
      break;
    case 'name':
    case 'class':
      result = getElementFromElements(htmlElement);
      break;
    case 'id_or_name':
    default:
      result = document.getElementById(htmlElement.attributeValue);
      if (result === null) {
        result = getElementFromElements(htmlElement);
      }
      break;
  }
  if (result === null) {
    const attributeName = htmlElement.attributeName ? htmlElement.attributeName : 'id or name';
    throw Error(`Error: Html element '${htmlElement.attributeValue}' not found using '${attributeName}'.`);
  }

  if (result.nodeName.toLowerCase() !== htmlElement.elementType.toLowerCase()) {
    throw Error(`Error: Expected an html ${htmlElement.elementType} element named ${htmlElement.attributeName} but found an html element of type ${result.nodeName}.`);
  }

  return result;
};

export const getFormElement = (htmlElement: WpHtmlElement | undefined): HTMLFormElement => {
  const finalElement = htmlElement ? htmlElement : {
    attributeName: 'tag',
  } as WpHtmlElement;

  finalElement.elementType = 'form';
  const result = getElement(finalElement);
  if (result instanceof HTMLFormElement) {
    return result;
  }
  throw Error(`Error: Expected an html ${finalElement.elementType} element named ${finalElement.attributeName} but found an html element of type ${result.nodeName}.`);
};