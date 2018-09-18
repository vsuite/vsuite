import VueTypes from 'vue-types';
import Popper from 'popper.js';
import prefix, { defaultClassPrefix } from 'utils/prefix';

const CLASS_PREFIX = 'form';

export default {
  name: 'Form',

  provide() {
    return {
      $vForm: this,
    };
  },

  props: {
    layout: VueTypes.oneOf(['horizontal', 'vertical', 'inline']).def(
      'vertical'
    ),
    fluid: VueTypes.bool.def(false),
    value: VueTypes.object,
    rules: VueTypes.any.def(() => ({})), // schema
    checkDelay: VueTypes.number.def(500),
    checkTrigger: VueTypes.oneOf(['change', 'blur', 'none']).def('change'),
    errorShow: {
      type: Boolean,
      default: undefined,
    },
    errorPlacement: VueTypes.oneOf(Popper.placements).def('bottom-start'),
    helpTooltip: VueTypes.bool.def(false),
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
    // change, error, check
  },

  data() {
    return { fields: [] };
  },

  computed: {
    classes() {
      return [
        this.classPrefix,
        this._addPrefix(this.layout),
        this._addPrefix(
          this.fluid && this.layout === 'vertical' ? 'fluid' : 'fixed-width'
        ),
      ];
    },
  },

  render() {
    return (
      <form
        class={this.classes}
        onSubmit={this._handleSubmit}
        onReset={this._handleReset}
      >
        {this.$slots.default}
      </form>
    );
  },

  methods: {
    _handleSubmit(e) {
      e.preventDefault();

      this.$emit('submit');
    },

    _handleReset(e) {
      e.preventDefault();

      this.$emit('reset');
    },

    _attachField(field) {
      this.fields.push(field);
    },

    _detachField(field) {
      this.fields.splice(this.fields.indexOf(field), 1);
    },

    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },

    validate() {},

    resetFields() {},
  },
};
