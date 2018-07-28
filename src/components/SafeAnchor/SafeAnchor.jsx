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

  data() {
    return {};
  },

  render() {
    const Component = this.componentClass;
    let tabIndex = this.tabIndex;

    if (this.disabled) {
      tabIndex = -1;
    }

    return (
      <Component
        href={this.href}
        role={this.role}
        tabIndex={tabIndex}
        onClick={this._onClick}
        {...this.$attrs}
        {...{ on: this.listeners }}
      >
        {this.$slots.default}
      </Component>
    );
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
