import VueTypes from 'vue-types';
import prefix, { defaultClassPrefix } from 'utils/prefix';
import { getName, cloneElement } from 'utils/node';
import { SIZES } from 'utils/constant';

const CLASS_PREFIX = 'btn-group';

export default {
  name: 'ButtonGroup',

  props: {
    size: VueTypes.oneOfType(SIZES),
    vertical: VueTypes.bool.def(false),
    justified: VueTypes.bool.def(false),
    block: VueTypes.bool.def(false),
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
  },

  computed: {
    classes() {
      return [
        this.classPrefix,
        {
          [this._addPrefix('size')]: this.size,
          [this._addPrefix('vertical')]: this.vertical,
          [this._addPrefix('justified')]: this.justified,
          [this._addPrefix('block')]: this.block,
        },
      ];
    },
  },

  render() {
    const children = (this.$slots.default || []).map(vnode => {
      if (getName(vnode) === 'Button') {
        return cloneElement(vnode, {
          props: { componentClass: 'a', role: 'button' },
        });
      } else {
        return cloneElement(vnode, {
          attrs: { componentClass: 'a', role: 'button' },
        });
      }
    });

    return (
      <div
        class={this.classes}
        role="group"
        {...this.$attrs}
        {...{ on: this.$listeners }}
      >
        {children}
      </div>
    );
  },

  methods: {
    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
