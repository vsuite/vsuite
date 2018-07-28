import curry from 'lodash.curry';

import { isArray } from './type';

function prefix(pre, className) {
  if (!pre || !className) return '';

  if (isArray(className)) {
    return className.filter(name => !!name).map(name => `${pre}-${name}`);
  }

  return `${pre}-${className}`;
}

export const globalKey = 'vs-';
export const defaultClassPrefix = name => `${globalKey}${name}`;
export default curry(prefix);
