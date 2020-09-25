import VueTypes from 'vue-types';
import { splitDataByComponent } from 'utils/split';

export default {
  name: 'SafeAnchor',

  props: {
    disabled: VueTypes.bool.def(false),
    href: VueTypes.string,

    role: VueTypes.string,
    tabindex: VueTypes.oneOfType([VueTypes.number, VueTypes.string]),
    componentClass: VueTypes.oneOfType([VueTypes.string, VueTypes.object]).def(
      'a'
    ),

    // @click
  },

  render() {
    const Component = this.componentClass;
    const anchorData = splitDataByComponent(
      {
        splitProps: {
          ...this.$attrs,
          role: this.role,
          tabindex: this.disabled ? -1 : this.tabindex,
          href: this.href,
        },
        on: {
          ...this.$listeners,
          click: this._handleClick,
        },
      },
      Component
    );

    return <Component {...anchorData}>{this.$slots.default}</Component>;
  },

  methods: {
    _handleClick(event) {
      if (this.disabled || !this.href || this.href.trim() === '#') {
        event.preventDefault();
      }

      if (this.disabled) {
        return event.stopPropagation();
      }

      this.$emit('click', event);
    },
  },
};
