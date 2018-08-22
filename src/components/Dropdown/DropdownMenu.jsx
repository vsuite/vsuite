import VueTypes from 'vue-types';
import prefix, { defaultClassPrefix } from 'utils/prefix';

const CLASS_PREFIX = 'dropdown-menu';

export default {
  name: 'DropdownMenu',

  props: {
    title: VueTypes.string,
    icon: VueTypes.string,
    pullLeft: VueTypes.bool.def(false),
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
  },

  computed: {},

  render(h) {
    const children = this.$slots.default || [];
    const { items, active } = this._getItemsAndStatus(h, children);
    const data = {
      class: [
        this.classPrefix,
        {
          [this._addPrefix('active')]: active,
        },
      ],
      attrs: {
        ...this.$attrs,
        role: 'menu',
      },
    };

    return <ul {...data}>{items}</ul>;
  },

  methods: {
    _getItemsAndStatus(h, children) {
      return { items: [], active: false };
    },

    _isActive(vnode, activeKey) {},

    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
