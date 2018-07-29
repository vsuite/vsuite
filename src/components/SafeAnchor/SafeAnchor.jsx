import VueTypes from 'vue-types';

export default {
  name: 'SafeAnchor',

  props: {
    href: VueTypes.string,
    disabled: VueTypes.bool.def(false),
    role: VueTypes.string,
    tabIndex: VueTypes.oneOfType([VueTypes.number, VueTypes.string]),
    componentClass: VueTypes.oneOfType([VueTypes.string, VueTypes.object]).def(
      'a'
    ),
  },

  render() {
    const Component = this.componentClass;
    const anchorData = {
      props: {
        ...this.$attrs,
        href: this.href,
        role: this.role,
        tabIndex: this.tabIndex,
      },
      on: {
        ...this.$listeners,
        click: this._onClick,
      },
    };

    if (this.disabled) {
      anchorData.props.tabIndex = -1;
    }

    return <Component {...anchorData}>{this.$slots.default}</Component>;
  },

  methods: {
    _onClick(event) {
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
