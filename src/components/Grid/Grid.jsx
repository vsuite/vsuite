import VueTypes from 'vue-types';
import prefix, { defaultClassPrefix } from 'utils/prefix';

const CLASS_PREFIX = 'grid-container';

export default {
  name: 'Grid',

  props: {
    fluid: VueTypes.bool.def(false),
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
    componentClass: VueTypes.oneOfType([VueTypes.string, VueTypes.object]).def(
      'div'
    ),
  },

  computed: {
    classes() {
      return this.fluid ? this._addPrefix('fluid') : this.classPrefix;
    },
  },

  render(h) {
    const Component = this.componentClass;
    const gridData = {
      class: this.classes,
      attrs: this.$attrs,
      on: this.$listeners,
    };

    return <Component {...gridData}>{this.$slots.default}</Component>;
  },

  methods: {
    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
