import _ from 'lodash';

function render(h, data) {
  let result = data;

  if (typeof result === 'function') {
    result = result(h);
  }

  if (_.isArray(result)) {
    result = result.map(c => (typeof c === 'function' ? c(h) : c));
  }

  return result;
}

export default render;
