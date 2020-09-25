import VueTypes from 'vue-types';
import prefix, { defaultClassPrefix } from 'utils/prefix';
import { getName } from 'utils/node';

const CLASS_PREFIX = 'container';

export default {
  name: 'Container',

  props: {
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
  },

  render() {
    const children = this.$slots.default || [];
    const hasSidebar = children.some(vnode => getName(vnode) === 'Sidebar');
    const data = {
      class: [
        this.classPrefix,
        {
          [this._addPrefix('has-sidebar')]: hasSidebar,
        },
      ],
      attrs: this.$attrs,
      on: this.$listeners,
    };

    return <div {...data}>{children}</div>;
  },

  methods: {
    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
