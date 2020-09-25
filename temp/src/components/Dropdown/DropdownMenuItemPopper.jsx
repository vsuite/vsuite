import VueTypes from 'vue-types';
import _ from 'lodash';
import Icon from 'components/Icon';
import Ripple from 'components/Ripple';
import popperMixin from 'mixins/popper';
import prefix, { defaultClassPrefix } from 'utils/prefix';
import { splitDataByComponent } from 'utils/split';

import { Fade, Collapse } from 'components/Animation';
import DropdownItem from './DropdownItem.jsx';

const CLASS_PREFIX = 'dropdown-menu';

export default {
  name: 'DropdownMenuItemPopper',

  mixins: [popperMixin],

  props: {
    title: VueTypes.string,
    pullLeft: VueTypes.bool.def(false),
    expanded: VueTypes.bool.def(false),

    collapsible: VueTypes.bool.def(false),
    sidenav: VueTypes.bool.def(false),
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
  },

  render(h) {
    let referenceData = splitDataByComponent(
      {
        splitProps: {
          ...this.$attrs,
          pullLeft: this.pullLeft,
          expanded: this.expanded,
          sidenav: this.sidenav,
        },
      },
      DropdownItem
    );
    let toggleData = {
      class: this._addPrefix('toggle'),
      attrs: { role: 'menu', tabindex: -1 },
    };
    let popperData = { class: this.classPrefix };

    if (!this.collapsible) {
      referenceData = _.merge(referenceData, {
        props: { open: this.currentVisible },
        directives: [
          { name: 'click-outside', value: this._handleClickOutside },
        ],
        ref: 'reference',
      });

      popperData = _.merge(popperData, {
        directives: [
          { name: 'show', value: this.currentVisible },
          { name: 'transfer-dom' },
        ],
        attrs: { 'data-transfer': `${this.transfer}` },
        ref: 'popper',
      });

      this._addTriggerListeners(toggleData, referenceData);

      return (
        <DropdownItem {...referenceData}>
          <div {...toggleData}>
            <span>{this.title || this.$slots.title}</span>
            <Icon
              class={this._addPrefix('toggle-icon')}
              icon={this.pullLeft ? 'angle-left' : 'angle-right'}
            />
            <Ripple />
          </div>
          <Fade>
            <ul {...popperData}>{this.$slots.default}</ul>
          </Fade>
        </DropdownItem>
      );
    }

    popperData = _.merge(popperData, {
      directives: [{ name: 'show', value: this.expanded }],
    });

    toggleData = _.merge(toggleData, {
      props: { open: this.expanded },
      on: { click: this._handleToggle },
    });

    return (
      <DropdownItem {...referenceData}>
        <div {...toggleData}>
          <span>{this.title || this.$slots.title}</span>
          <Icon
            class={this._addPrefix('toggle-icon')}
            icon={this.pullLeft ? 'angle-left' : 'angle-right'}
          />
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
  },
};
