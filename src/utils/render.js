import _ from 'lodash';

function render(h, data) {
  let result = data;

  if (typeof data === 'function') {
    result = data(h);
  }

  if (_.isArray(data)) {
    result = data.map(c => (typeof c === 'function' ? c(h) : c));
  }

  return result;
}

export default render;
