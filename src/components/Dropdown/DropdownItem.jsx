import VueTypes from 'vue-types';
import SafeAnchor from 'components/SafeAnchor';
import Icon from 'components/Icon';
import prefix, { defaultClassPrefix } from 'utils/prefix';

const CLASS_PREFIX = 'dropdown-item';

export default {
  name: 'DropdownItem',

  props: {
    icon: VueTypes.string,
    divider: VueTypes.bool.def(false),
    panel: VueTypes.bool.def(false),
    active: VueTypes.bool.def(false),
    disabled: VueTypes.bool.def(false),
    eventKey: VueTypes.any,
    tabindex: VueTypes.number.def(-1),
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
    componentClass: VueTypes.oneOfType([VueTypes.string, VueTypes.object]).def(
      SafeAnchor
    ),
    // select
  },

  computed: {
    classes() {
      return [
        this.classPrefix,
        {
          // [this._addPrefix('expand')]
          // [this._addPrefix('submenu')]
          // [this._addPrefix('open')]
          [this._addPrefix('disabled')]: this.disabled,
          // [_addPrefix(`pull-${pullLeft ? 'left' : 'right'}`)]: pullLeft
        },
      ];
    },
  },

  render() {
    if (this.divider) {
      return <li class={this._addPrefix('divider')} role="separator" />;
    }

    if (this.panel) {
      return <li class={this._addPrefix('panel')}>{this.$slots.default}</li>;
    }

    const Component = this.componentClass;
    let data = {
      class: this._addPrefix('content'),
      props: {},
      attrs: { tabindex: this.tabindex },
    };

    if (typeof Component === 'string') {
      data.attrs = {
        ...this.$attrs,
        ...data.attrs,
      };
    } else {
      data.props = this.$attrs;
    }

    return (
      <li class={this.classes} role="presentation">
        <Component>
          {this.$slots.icon || (this.icon && <Icon icon={this.icon} />)}
          {this.$slots.default}
        </Component>
      </li>
    );
  },

  methods: {
    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
