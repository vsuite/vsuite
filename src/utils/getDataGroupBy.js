import _ from 'lodash';

function getDataGroupBy(data = [], key) {
  const tempData = {};

  data.forEach(item => {
    if (!tempData[item[key]]) {
      tempData[item[key]] = [];
    }
    tempData[item[key]].push(item);
  });

  return _.toPairs(tempData).map(item => ({
    label: item[0],
    children: item[1],
  }));
}

export default getDataGroupBy;
