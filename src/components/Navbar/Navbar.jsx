import VueTypes from 'vue-types';
import prefix, { defaultClassPrefix } from 'utils/prefix';
import { splitDataByComponent } from 'utils/split';

import NavbarHeader from './NavbarHeader.jsx';
import NavbarBody from './NavbarBody.jsx';

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

    headerClassName: VueTypes.any,
    headerStyle: VueTypes.any,
    bodyClassName: VueTypes.any,
    bodyStyle: VueTypes.any,

    hasChildContext: VueTypes.bool,
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
    componentClass: VueTypes.oneOfType([VueTypes.string, VueTypes.object]).def(
      'div'
    ),

    // slot
    // slot-header
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
        splitProps: { ...this.$attrs, role: 'navigation' },
        on: this.$listeners,
      },
      Component
    );
    const header = this.$slots.header && (
      <NavbarHeader class={this.headerClassName} style={this.headerStyle}>
        {this.$slots.header}
      </NavbarHeader>
    );
    const body = this.$slots.default && (
      <NavbarBody class={this.bodyClassName} style={this.bodyStyle}>
        {this.$slots.default}
      </NavbarBody>
    );

    return (
      <Component {...data}>
        {header}
        {body}
      </Component>
    );
  },

  methods: {
    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
