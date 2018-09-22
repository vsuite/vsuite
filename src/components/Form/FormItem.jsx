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
    name: String,
    label: VueTypes.string, // slot
    help: VueTypes.string, // slot
    rule: VueTypes.any,
    isRequired: VueTypes.bool.def(false),
    defaultValue: VueTypes.any,
    htmlFor: VueTypes.string,
    srOnly: VueTypes.bool.def(false),
    errorShow: { type: Boolean, default: undefined },
    errorMessage: String,
    errorPlacement: VueTypes.oneOf(Popper.placements),
    helpTooltip: { type: Boolean, default: undefined },
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
  },

  data() {
    return {
      innerErrorShow: false,
      innerErrorMessage: '',
    };
  },

  mounted() {
    this._attachForm();

    this.dispatch = _.debounce(
      this._dispatch.bind(this),
      _.get(this.$vForm, 'checkDelay') || 500
    );
  },

  beforeDestroy() {
    this._detachForm();
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

    fieldValue() {
      if (!this.$vForm) return;
      if (_.isUndefined(this.name)) return;

      return _.get(this.$vForm.value, this.name);
    },

    fieldRule() {
      if (!this.$vForm) return this.rule;

      return this.rule || _.get(this.$vForm.rules, this.name);
    },

    hTooltip() {
      const helpTooltip = _.get(this.$vForm, 'helpTooltip');

      return (
        (_.isUndefined(this.helpTooltip) ? helpTooltip : this.helpTooltip) ||
        false
      );
    },

    eShow() {
      const errorShow = _.get(this.$vForm, 'errorShow');

      return (
        (_.isUndefined(this.errorShow)
          ? _.isUndefined(errorShow)
            ? this.innerErrorShow
            : errorShow
          : this.errorShow) || false
      );
    },

    eMessage() {
      return (
        (_.isUndefined(this.errorMessage)
          ? this.innerErrorMessage
          : this.errorMessage) || ''
      );
    },

    ePlacement() {
      const errorPlacement = _.get(this.$vForm, 'errorPlacement');

      return (
        (_.isUndefined(this.errorPlacement)
          ? errorPlacement
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
      const localError = this.$slots.errorMessage || this.eMessage;
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

    _attachForm() {
      if (!this.$vForm) return;
      if (!this.name) return;

      this.$vForm._attachField(this);
    },

    _detachForm() {
      if (!this.$vForm) return;
      if (!this.name) return;

      this.$vForm._detachField(this);
    },

    _validateField(cb) {
      this.fieldRule.check(
        this.fieldValue,
        this.$vForm.value,
        ({ hasError, errorMessage }) => {
          if (hasError) {
            this.innerErrorMessage = errorMessage;
          }

          this.innerErrorShow = hasError;

          cb && cb(hasError ? errorMessage : null);
        }
      );
    },

    _resetField() {
      if (!this.name) return;

      this.innerErrorShow = false;
      this.innerErrorMessage = '';
    },

    _dispatch(trigger) {
      if (!this.name) return;
      if (_.get(this.$vForm, 'checkTrigger') !== trigger) return;

      this._validateField();
    },

    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
