import curry from 'lodash.curry';

import { SIZES, COLORS, STATUS } from './constant';

function enumCheck(list, val) {
  return !!~list.indexOf(val);
}

export const validateSize = val => enumCheck(SIZES, val);
export const validateStatus = val => enumCheck(STATUS, val);
export const validateColor = val => enumCheck(COLORS, val);
export const validateEnum = curry(enumCheck);
