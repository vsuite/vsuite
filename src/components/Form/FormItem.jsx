import VueTypes from 'vue-types';
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
    name: VueTypes.string.isRequired,
    label: VueTypes.string, // slot
    help: VueTypes.string, // slot
    htmlFor: VueTypes.string,
    srOnly: VueTypes.bool.def(false),
    errorMessage: VueTypes.string,
    errorPlacement: VueTypes.oneOf(Popper.placements),
    errorTooltip: VueTypes.bool,
    helpTooltip: VueTypes.bool,
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
      return <FormItemControl>{this.$slots.default}</FormItemControl>;
    },

    _renderHelper() {
      const hasHelper = this.$slots.help || this.help;

      if (!hasHelper) return null;

      return (
        <FormItemHelper htmlFor={this.htmlFor} tooltip={this.helpTooltip}>
          {this.$slots.help || this.help}
        </FormItemHelper>
      );
    },

    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
