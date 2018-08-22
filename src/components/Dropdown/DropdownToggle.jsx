import VueTypes from 'vue-types';
import Button from 'components/Button';
import Ripple from 'components/Ripple';
import Icon from 'components/Icon';
import prefix, { defaultClassPrefix } from 'utils/prefix';

const CLASS_PREFIX = 'dropdown-toggle';

export default {
  name: 'DropdownToggle',

  props: {
    icon: VueTypes.string,
    noCaret: VueTypes.bool.def(false),
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
    componentClass: VueTypes.oneOfType([VueTypes.string, VueTypes.object]).def(
      Button
    ),
  },

  render(h) {
    if (this.$slots.title) {
      const data = {
        class: [this.classPrefix, this._addPrefix('custom-title')],
        attrs: this.$attrs,
      };

      return (
        <span {...data}>
          {this.$slots.title}
          <Ripple />
        </span>
      );
    }

    const Component = this.componentClass;
    let btnData = { class: this.classPrefix, props: {}, attrs: {} };

    if (Component.name === Button.name) {
      btnData.props = {
        componentClass: 'a',
        appearance: 'subtle',
      };
    }

    if (typeof Component === 'string') {
      btnData.attrs = this.$attrs;
    } else {
      btnData.props = {
        ...btnData.props,
        ...this.$attrs,
      };
    }

    return (
      <Component {...btnData}>
        {this.$slots.icon || (this.icon && <Icon icon={this.icon} />)}
        {this.$slots.default}
        {this.noCaret ? null : <span class={this._addPrefix('caret')} />}
      </Component>
    );
  },

  methods: {
    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
