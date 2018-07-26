import curry from 'lodash.curry';

import { isNullable, isArray } from './type';

function zipArray(leftArr, rightArr) {
  if (isNullable(leftArr)) return {};

  if (!isArray(leftArr)) {
    leftArr = [leftArr];
  }

  if (isNullable(rightArr)) {
    rightArr = leftArr;
  } else if (!isArray(rightArr)) {
    rightArr = [rightArr];
  }

  return leftArr.reduce((map, val, ind) => {
    map[val] = rightArr[ind];

    return map;
  }, {});
}

export default curry(zipArray);
