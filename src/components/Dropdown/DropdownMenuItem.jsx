import VueTypes from 'vue-types';
import SafeAnchor from 'components/SafeAnchor';
import Icon from 'components/Icon';
import prefix, { defaultClassPrefix } from 'utils/prefix';
import { splitDataByComponent } from 'utils/split';

const CLASS_PREFIX = 'dropdown-item';

export default {
  name: 'DropdownMenuItem',

  props: {
    icon: VueTypes.string,
    divider: VueTypes.bool.def(false),
    panel: VueTypes.bool.def(false),
    active: VueTypes.bool.def(false),
    disabled: VueTypes.bool.def(false),
    eventKey: VueTypes.any,
    expanded: VueTypes.bool.def(false),
    pullLeft: VueTypes.bool.def(false),
    submenu: VueTypes.bool.def(false),
    sidenav: VueTypes.bool.def(false),
    tabindex: VueTypes.number.def(-1),
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
    componentClass: VueTypes.oneOfType([VueTypes.string, VueTypes.object]).def(
      SafeAnchor
    ),
  },

  computed: {
    classes() {
      return [
        this.classPrefix,
        {
          [this._addPrefix(this.expanded ? 'expand' : 'collapse')]:
            this.submenu && this.sidenav,
          [this._addPrefix('submenu')]: this.submenu,
          [this._addPrefix('active')]: this.active,
          [this._addPrefix('disabled')]: this.disabled,
          [this._addPrefix(`pull-${this.pullLeft ? 'left' : 'right'}`)]: this
            .pullLeft,
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
    let data = splitDataByComponent(
      {
        class: this._addPrefix('content'),
        splitProps: {
          ...this.$attrs,
          tabindex: this.tabindex,
        },
        on: { ...this.$listeners, click: this._handleClick },
      },
      Component
    );

    return (
      <li class={this.classes} role="presentation">
        <Component {...data}>
          {this.$slots.icon || (this.icon && <Icon icon={this.icon} />)}
          {this.$slots.default}
        </Component>
      </li>
    );
  },

  methods: {
    _handleClick(event) {
      if (this.disabled) return event.preventDefault();

      this.$emit('click', event);
      this.$emit('select', this.eventKey, event);
    },

    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
