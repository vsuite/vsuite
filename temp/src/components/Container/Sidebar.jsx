import VueTypes from 'vue-types';
import prefix, { defaultClassPrefix } from 'utils/prefix';

const CLASS_PREFIX = 'sidebar';

export default {
  name: 'Sidebar',

  props: {
    width: VueTypes.number.def(260),
    collapsible: VueTypes.bool.def(false),
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
  },

  computed: {
    classes() {
      return [
        this.classPrefix,
        {
          [this._addPrefix('collapse')]: this.collapsible,
        },
      ];
    },
  },

  render() {
    const data = {
      class: this.classes,
      style: {
        flex: `0 0 ${this.width}px`,
        width: `${this.width}px`,
      },
      attrs: this.$attrs,
      on: this.$listeners,
    };

    return <div {...data}>{this.$slots.default}</div>;
  },

  methods: {
    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
