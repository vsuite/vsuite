import VueTypes from 'vue-types';
import prefix, { defaultClassPrefix } from 'utils/prefix';
import { splitDataByComponent } from 'utils/split';

const CLASS_PREFIX = 'navbar';

export default {
  name: 'Navbar',

  provide() {
    return {
      $vNavbar: this.hasChildContext && this,
    };
  },

  props: {
    appearance: VueTypes.oneOf(['default', 'inverse', 'subtle']).def('default'),
    hasChildContext: VueTypes.bool,
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
    componentClass: VueTypes.oneOfType([VueTypes.string, VueTypes.object]).def(
      'div'
    ),
  },

  computed: {
    classes() {
      return [this.classPrefix, this._addPrefix(this.appearance)];
    },
  },

  render() {
    const Component = this.componentClass;
    const data = splitDataByComponent(
      {
        class: this.classes,
        splitProps: {
          ...this.$attrs,
          role: 'navigation',
        },
        on: this.$listeners,
      },
      Component
    );

    return <Component {...data}>{this.$slots.default}</Component>;
  },

  methods: {
    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
