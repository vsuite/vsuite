import VueTypes from 'vue-types';
import _ from 'lodash';
import invariant from 'utils/invariant';
import prefix, { defaultClassPrefix } from 'utils/prefix';
import { cloneElement } from 'utils/node';

const CLASS_PREFIX = 'panel';

// select, enter, entering, exit, exiting, exited

export default {
  name: 'Panel',

  props: {
    bordered: VueTypes.bool.def(false),
    bodyFill: VueTypes.bool.def(false),
    collapsible: VueTypes.bool.def(false),
    defaultExpanded: VueTypes.bool.def(false),
    expanded: Boolean,
    eventKey: VueTypes.any,
    header: VueTypes.string,
    headerRole: VueTypes.string,
    panelRole: VueTypes.string,
    id: VueTypes.oneOfType([VueTypes.string, VueTypes.number]),
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
  },

  data() {
    return {
      vExpanded: this.defaultExpanded,
    };
  },

  computed: {
    hasHeader() {
      invariant.not(
        this.header && this.$slots.header,
        'You cannot use property header and slot header at same time. Please pick one way.'
      );

      return this.header || this.$slots.header;
    },
    isExpanded() {
      return _.isUndefined(this.expanded) ? this.vExpanded : this.expanded;
    },
    classes() {
      return [
        this.classPrefix,
        this._addPrefix('default'),
        {
          [this._addPrefix('in')]: this.isExpanded,
          [this._addPrefix('collapsible')]: this.collapsible,
          [this._addPrefix('bordered')]: this.bordered,
        },
      ];
    },
  },

  render(h) {
    const panelData = {
      class: this.classes,
      attrs: {
        id: this.collapsible ? null : this.id,
      },
    };

    return (
      <div {...panelData}>
        {this._renderHeading(h)}
        {this.collapsible
          ? this._renderCollapsibleBody(h)
          : this._renderBody(h)}
      </div>
    );
  },

  methods: {
    _renderAnchor(h) {
      return null;
    },

    _renderCollapsibleTitle(h) {
      return null;
    },

    _renderHeading(h) {
      let header = this.header || this.$slots.header;

      if (!this.hasHeader) return null;

      if (this.$slots.header && this.$slots.header.length === 1) {
        header = cloneElement(this.$slots.header[0], {
          class: this._addPrefix('title'),
        });
      } else {
        header = this.collapsible ? this._renderCollapsibleTitle(h) : header;
      }

      return (
        <div
          role="rowHeader"
          class={this._addPrefix('heading')}
          onClick={this._handleSelect}
          tabIndex={-1}
        >
          {header}
        </div>
      );
    },

    _renderCollapsibleBody(h) {
      return null;
    },

    _renderBody(h) {
      return null;
    },

    _handleSelect() {},

    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
