import VueTypes from 'vue-types';
import _ from 'lodash';
import Popper from 'popper.js';
import prefix, { defaultClassPrefix, globalKey } from 'utils/prefix';

import FormItemLabel from './FormItemLabel.jsx';
import FormItemError from './FormItemError.jsx';
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
    errorShow: { type: Boolean, default: undefined },
    errorMessage: VueTypes.string,
    errorPlacement: VueTypes.oneOf(Popper.placements),
    helpTooltip: { type: Boolean, default: undefined },
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
    eShow() {
      return (
        (_.isUndefined(this.errorShow)
          ? this.$vForm && this.$vForm.errorShow
          : this.errorShow) || false
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

    _renderItem(h) {
      const errorDefaultScoped = _.get(
        this.$vForm,
        '$scopedSlots.errorMessage'
      );
      const errorScoped =
        _.get(this, '$scopedSlots.errorMessage') || errorDefaultScoped;
      const localError = this.$slots.errorMessage || this.errorMessage;
      const error = errorScoped
        ? errorScoped(h, {
            show: this.eShow,
            error: localError,
            placement: this.ePlacement,
          })
        : localError;

      return (
        <div class={`${globalKey}form-control-wrapper`}>
          {this.$slots.default}
          {errorScoped && error}
          {!errorScoped && (
            <FormItemError
              class={`${globalKey}form-control-message-wrapper`}
              show={this.eShow}
              placement={this.ePlacement}
              htmlFor={this.htmlFor}
            >
              {error}
            </FormItemError>
          )}
        </div>
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
