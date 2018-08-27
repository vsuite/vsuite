import VueTypes from 'vue-types';
import Icon from 'components/Icon';
import Ripple from 'components/Ripple';
import popperMixin from 'mixins/popper';
import prefix, { defaultClassPrefix } from 'utils/prefix';
import { splitDataByComponent } from 'utils/split';

import DropdownItem from './DropdownItem.jsx';

const CLASS_PREFIX = 'dropdown-menu';

export default {
  name: 'DropdownItemPopper',

  mixins: [popperMixin],

  props: {
    title: VueTypes.string,
    pullLeft: VueTypes.bool.def(false),
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
  },

  render() {
    const dipData = splitDataByComponent(
      {
        class: this._addPrefix(`pull-${this.pullLeft ? 'left' : 'right'}`),
        splitProps: this.$attrs,
        directives: [
          { name: 'click-outside', value: this._handleClickOutside },
        ],
        on: {},
        ref: 'reference',
      },
      DropdownItem
    );
    const referenceData = {
      class: this._addPrefix('toggle'),
      attrs: {
        role: 'menu',
        tabindex: -1,
      },
      on: {},
      ref: 'wrapper',
    };
    const popperData = {
      class: [this.classPrefix, this._addPickerPrefix('menu')],
      style: {},
      directives: [
        {
          name: 'show',
          value: this.currentVisible,
        },
        { name: 'transfer-dom' },
      ],
      attrs: {
        'data-transfer': `${this.transfer}`,
      },
      ref: 'popper',
    };

    this._addTriggerListeners(referenceData, dipData);

    return (
      <DropdownItem {...dipData}>
        <div {...referenceData}>
          <span>{this.title || this.$slots.title}</span>
          <Icon icon={this.pullLeft ? 'angle-left' : 'angle-right'} />
          <Ripple />
        </div>
        <transition name="picker-fade">
          <ul {...popperData}>{this.$slots.default}</ul>
        </transition>
      </DropdownItem>
    );
  },

  methods: {
    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },

    _addPickerPrefix(cls) {
      return prefix(defaultClassPrefix('picker'), cls);
    },
  },
};
