import _ from 'lodash';

function getDataGroupBy(data = [], key, sort) {
  const tempData = {};
  const isSort = typeof sort === 'function';

  data.forEach(item => {
    if (!tempData[item[key]]) {
      tempData[item[key]] = [];
    }
    tempData[item[key]].push(item);
  });

  let nextData = _.toPairs(tempData).map(item => ({
    label: item[0],
    groupTitle: item[0],
    children: isSort ? item[1].sort(sort(false)) : item[1],
  }));

  if (isSort) {
    nextData = nextData.sort(sort(true));
  }

  return nextData;
}

export default getDataGroupBy;
