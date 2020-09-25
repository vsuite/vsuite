import _ from 'lodash';
import VueTypes from 'vue-types';

function render(h, data) {
  let result = data;

  // function
  if (typeof result === 'function') {
    result = result(h);
  }

  // array
  if (_.isArray(result)) {
    return result.map(c => render(h, c));
  }

  // boolean
  if (_.isBoolean(result)) return null;

  // string, number and so on
  if (!_.isObject(result)) return result;

  // vnode
  if (!_.isPlainObject(result) && result.constructor.name === 'VNode') {
    return result;
  }

  return null;
}

export const RenderX = VueTypes.oneOfType([
  VueTypes.string,
  VueTypes.object,
  VueTypes.array,
  VueTypes.func,
]).def('');
export default render;
