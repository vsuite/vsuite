import VueTypes from 'vue-types';
import invariant from 'utils/invariant';
import prefix, { defaultClassPrefix } from 'utils/prefix';
import { getName, cloneElement } from 'utils/node';
import { SIZES } from 'utils/constant';

const CLASS_PREFIX = 'btn-group';

export default {
  name: 'ButtonGroup',

  props: {
    size: VueTypes.oneOf(SIZES),
    vertical: VueTypes.bool.def(false),
    justified: VueTypes.bool.def(false),
    block: VueTypes.bool.def(false),

    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),

    // slot
  },

  computed: {
    classes() {
      return [
        this.classPrefix,
        {
          [this._addPrefix(this.size)]: this.size,
          [this._addPrefix('vertical')]: this.vertical,
          [this._addPrefix('justified')]: this.justified,
          [this._addPrefix('block')]: this.block,
        },
      ];
    },
  },

  render() {
    const btnGroupData = {
      class: this.classes,
      attrs: {
        role: 'group',
        ...this.$attrs,
      },
      on: this.$listeners,
    };
    let children = this.$slots.default || [];

    if (this.justified) {
      children = children.map(vnode => {
        const name = getName(vnode);

        invariant.not(
          name && name !== 'Button' && name !== 'IconButton',
          `<${name}> cannot be child of <ButtonGroup>`
        );

        if (name === 'Button') {
          return cloneElement(vnode, {
            props: { componentClass: 'a', role: 'button' },
          });
        } else if (name === 'IconButton') {
          return cloneElement(vnode, {
            attrs: { componentClass: 'a', role: 'button' },
          });
        } else {
          return vnode;
        }
      });
    }

    return <div {...btnGroupData}>{children}</div>;
  },

  methods: {
    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
