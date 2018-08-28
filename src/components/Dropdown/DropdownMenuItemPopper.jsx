import VueTypes from 'vue-types';
import _ from 'lodash';
import Icon from 'components/Icon';
import Ripple from 'components/Ripple';
import popperMixin from 'mixins/popper';
import prefix, { defaultClassPrefix } from 'utils/prefix';
import { splitDataByComponent } from 'utils/split';

import DropdownItem from './DropdownMenuItem.jsx';
import Collapse from 'components/Animation/Collapse';

const CLASS_PREFIX = 'dropdown-menu';

export default {
  name: 'DropdownMenuItemPopper',

  mixins: [popperMixin],

  props: {
    title: VueTypes.string,
    pullLeft: VueTypes.bool.def(false),
    expanded: VueTypes.bool.def(false),
    sidenav: VueTypes.bool.def(false),
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
  },

  render(h) {
    let dipData = splitDataByComponent(
      {
        splitProps: {
          ...this.$attrs,
          pullLeft: this.pullLeft,
          expanded: this.expanded,
          sidenav: this.sidenav,
        },
        ref: 'reference',
      },
      DropdownItem
    );
    let referenceData = {
      class: this._addPrefix('toggle'),
      attrs: {
        role: 'menu',
        tabindex: -1,
      },
      ref: 'wrapper',
    };
    let popperData = {
      class: [this.classPrefix, this._addPickerPrefix('menu')],
      ref: 'popper',
    };

    if (!this.sidenav) {
      dipData = _.merge(dipData, {
        directives: [
          { name: 'click-outside', value: this._handleClickOutside },
        ],
      });

      popperData = _.merge(popperData, {
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
      });

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
    }

    popperData = _.merge(popperData, {
      attrs: {
        'aria-hidden': !this.expanded,
      },
      directives: [{ name: 'show', value: this.expanded }],
    });

    referenceData = _.merge(referenceData, {
      on: {
        click: this._handleToggle,
      },
    });

    return (
      <DropdownItem {...dipData}>
        <div {...referenceData}>
          <span>{this.title || this.$slots.title}</span>
          <Icon icon={this.pullLeft ? 'angle-left' : 'angle-right'} />
          <Ripple />
        </div>
        {this._renderCollapse(
          h,
          <ul {...popperData}>{this.$slots.default}</ul>
        )}
      </DropdownItem>
    );
  },

  methods: {
    _renderCollapse(h, children) {
      return <Collapse>{children}</Collapse>;
    },

    _handleToggle(event) {
      this.$emit('toggle', this.$attrs.eventKey, event);
    },

    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },

    _addPickerPrefix(cls) {
      return prefix(defaultClassPrefix('picker'), cls);
    },
  },
};
