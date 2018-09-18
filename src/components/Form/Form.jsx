import VueTypes from 'vue-types';
import _ from 'lodash';
import Popper from 'popper.js';
import prefix, { defaultClassPrefix } from 'utils/prefix';
import invariant from 'utils/invariant';

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
    _attachField(field) {
      this.fields.push(field);
    },

    _detachField(field) {
      this.fields.splice(this.fields.indexOf(field), 1);
    },

    _handleSubmit(e) {
      e.preventDefault();

      this.validate(valid => this.$emit('submit', valid));
    },

    _handleReset(e) {
      e.preventDefault();

      this.reset(() => this.$emit('reset'));
    },

    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },

    validate(fields, cb) {
      return new Promise((resolve, reject) => {
        if (_.isFunction(fields)) {
          cb = fields;
          fields = false;
        }

        if (_.isString(fields)) {
          fields = [fields];
        }

        if (fields && !_.isArray(fields)) {
          return reject(new Error('`fields` is not a string or array value!'));
        }

        let errorMap = {};

        this.fields.forEach(field => {
          const name = field.name;

          if (fields && fields.indexOf(name) === -1) return;

          // TODO: 异步获取校验结果
          const error = field._validateField();

          if (error) {
            _.set(errorMap, name, error);
          }
        });

        if (_.isEmpty(errorMap)) {
          cb && cb(null);

          return resolve(null);
        }

        cb && cb(errorMap);

        return resolve(errorMap);
      });
    },

    reset(fields, cb) {
      if (_.isFunction(fields)) {
        cb = fields;
        fields = false;
      }

      if (_.isString(fields)) {
        fields = [fields];
      }

      invariant.not(
        fields && !_.isArray(fields),
        '`fields` is not a string or array value!'
      );

      this.fields.forEach(field => {
        const name = field.name;

        if (fields && fields.indexOf(name) === -1) return;

        field._resetField();
      });

      cb && cb();
    },
  },
};
