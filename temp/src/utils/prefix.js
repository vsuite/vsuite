import _ from 'lodash';

function prefix(pre, className) {
  if (!pre || !className) return '';

  if (_.isArray(className)) {
    return className.filter(name => !!name).map(name => `${pre}-${name}`);
  }

  return `${pre}-${className}`;
}

export const globalKey = 'vs-';
export const defaultClassPrefix = name => `${globalKey}${name}`;
export default _.curry(prefix);
