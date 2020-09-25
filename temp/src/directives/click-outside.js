import { on, off } from 'shares/dom';

export default {
  bind(el, binding, vnode) {
    function documentHandler(e) {
      if (el.contains(e.target)) {
        return false;
      }
      if (binding.expression) {
        binding.value(e);
      }
    }

    el.__vueClickOutside__ = documentHandler;

    on(document, 'click', documentHandler);
  },
  update() {},
  unbind(el, binding) {
    off(document, 'click', el.__vueClickOutside__);

    delete el.__vueClickOutside__;
  },
};
