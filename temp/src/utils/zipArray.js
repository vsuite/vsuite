import _ from 'lodash';

function zipArray(leftArr, rightArr) {
  if (_.isNil(leftArr)) return {};

  if (!_.isArray(leftArr)) {
    leftArr = [leftArr];
  }

  if (_.isNil(rightArr)) {
    rightArr = leftArr;
  } else if (!_.isArray(rightArr)) {
    rightArr = [rightArr];
  }

  return leftArr.reduce((map, val, ind) => {
    map[val] = rightArr[ind];

    return map;
  }, {});
}

export default _.curry(zipArray);
