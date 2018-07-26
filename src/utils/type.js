import curry from 'lodash.curry';

function isType(type, obj) {
  const expect = `[object ${type.toLowerCase()}]`;
  const result = Object.prototype.toString.call(obj).toLowerCase();

  return expect === result;
}

export const isObject = obj => isType('object', obj);
export const isArray = obj => isType('array', obj);
export const isNullable = obj => obj === null || obj === undefined;
export default curry(isType);
