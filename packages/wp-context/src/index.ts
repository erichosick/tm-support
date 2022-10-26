import './globals';
import uuidGenerate from './uuid-generate';
// import wpContextBuild from './wp-context-build';
// import wpContextApply from './wp-context-apply';
// import {
//   wpSessionInit,
//   wpSessionGet,
//   wpSessionSet,
// } from './wp-context-session';
import { tmContextConfigDefault } from './defaults';
import {
  getElementFromElements,
  getElement,
  getFormElement
} from './wp-html';

const tm = {
  uuidGenerate,
  // wpContextApply,
  // wpContextBuild,
  // wpSessionInit,
  // wpSessionGet,
  // wpSessionSet,
  defaults: {
    tmContextConfigDefault,
  },
  html: {
    getElementFromElements,
    getElement,
    getFormElement,
  },
};

window.tm = tm;

export default tm;