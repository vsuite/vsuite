import VueTypes from 'vue-types';
import _ from 'lodash';
import Popper from 'popper.js';
import prefix, { defaultClassPrefix } from 'utils/prefix';

import FormItemLabel from './FormItemLabel.jsx';
import FormItemControl from './FormItemControl.jsx';
import FormItemHelper from './FormItemHelper.jsx';

const CLASS_PREFIX = 'form-group';

export default {
  name: 'FormItem',

  inject: {
    $vForm: { from: '$vForm', default: false },
  },

  props: {
    name: VueTypes.string,
    label: VueTypes.string, // slot
    help: VueTypes.string, // slot
    rule: VueTypes.any,
    isRequired: VueTypes.bool.def(false),
    defaultValue: VueTypes.any,
    htmlFor: VueTypes.string,
    srOnly: VueTypes.bool.def(false),
    errorMessage: VueTypes.string,
    errorPlacement: VueTypes.oneOf(Popper.placements),
    helpTooltip: {
      type: Boolean,
      default: undefined,
    },
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
  },

  computed: {
    classes() {
      return [
        this.classPrefix,
        {
          // [this._addPrefix('has-success')]:
          // [this._addPrefix('has-error')]:
          // [this._addPrefix('has-warning')]:
        },
      ];
    },
    hTooltip() {
      return (
        (_.isUndefined(this.helpTooltip)
          ? this.$vForm && this.$vForm.helpTooltip
          : this.helpTooltip) || false
      );
    },
    ePlacement() {
      return (
        (_.isUndefined(this.errorPlacement)
          ? this.$vForm && this.$vForm.errorPlacement
          : this.errorPlacement) || 'bottom-start'
      );
    },
  },

  render(h) {
    return (
      <div class={this.classes} role="group">
        {this._renderLabel(h)}
        {this._renderItem(h)}
        {this._renderHelper(h)}
      </div>
    );
  },

  methods: {
    _renderLabel() {
      const hasLabel = this.$slots.label || this.label;

      if (!hasLabel) return null;

      return (
        <FormItemLabel htmlFor={this.htmlFor} srOnly={this.srOnly}>
          {this.$slots.label || this.label}
        </FormItemLabel>
      );
    },

    _renderItem() {
      return (
        <FormItemControl placement={this.ePlacement}>
          {this.$slots.default}
        </FormItemControl>
      );
    },

    _renderHelper() {
      const hasHelper = this.$slots.help || this.help;

      if (!hasHelper) return null;

      return (
        <FormItemHelper htmlFor={this.htmlFor} tooltip={this.hTooltip}>
          {this.$slots.help || this.help}
        </FormItemHelper>
      );
    },

    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
