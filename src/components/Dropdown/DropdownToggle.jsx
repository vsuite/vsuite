import VueTypes from 'vue-types';
import _ from 'lodash';
import prefix, { defaultClassPrefix } from 'utils/prefix';
import { splitDataByComponent } from 'utils/split';

import Button from 'components/Button';
import Ripple from 'components/Ripple';
import Icon from 'components/Icon';

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

  render() {
    if (this.$slots.title) {
      const data = {
        class: [this.classPrefix, this._addPrefix('custom-title')],
        attrs: this.$attrs,
        on: this.$listeners,
      };

      return (
        <span {...data}>
          {this.$slots.title}
          <Ripple />
        </span>
      );
    }

    const Component = this.componentClass;
    let btnData = {
      class: this.classPrefix,
      on: this.$listeners,
    };

    if (Component.name === Button.name) {
      btnData = _.merge(btnData, {
        props: {
          componentClass: 'a',
          appearance: 'subtle',
        },
      });
    }

    btnData = splitDataByComponent(
      {
        ...btnData,
        splitProps: this.$attrs,
      },
      Component,
      true
    );

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
