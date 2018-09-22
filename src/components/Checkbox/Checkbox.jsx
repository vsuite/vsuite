import VueTypes from 'vue-types';
import _ from 'lodash';
import prefix, { defaultClassPrefix } from 'utils/prefix';
import { findComponentUpward } from 'utils/find';

const CLASS_PREFIX = 'checkbox';

export default {
  name: 'Checkbox',

  model: {
    prop: 'checked',
    event: 'change',
  },

  props: {
    checked: {
      type: Boolean,
      default: undefined,
    },
    defaultChecked: {
      type: Boolean,
      default: undefined,
    },
    value: VueTypes.any,
    inline: VueTypes.bool.def(false),
    disabled: VueTypes.bool.def(false),
    indeterminate: VueTypes.bool.def(false),
    tabindex: VueTypes.number,
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
  },

  data() {
    return {
      innerChecked: _.isUndefined(this.checked)
        ? this.defaultChecked
        : this.checked,
    };
  },

  computed: {
    classes() {
      return [
        this.classPrefix,
        {
          [this._addPrefix('inline')]: this.inline,
          [this._addPrefix('indeterminate')]: this.indeterminate,
          [this._addPrefix('disabled')]: this.disabled,
          [this._addPrefix('checked')]: this.currentChecked,
        },
      ];
    },

    currentChecked() {
      return _.isUndefined(this.checked) ? this.innerChecked : this.checked;
    },
  },

  render() {
    const checkboxData = {
      class: this.classes,
      on: {
        ..._.omit(this.$listeners, ['change']),
      },
    };
    const iptData = {
      domProps: {
        checked: this.currentChecked,
      },
      attrs: {
        ...this.$attrs,
        type: 'checkbox',
        disabled: this.disabled,
      },
      on: {
        change: this._handleChange,
        click: e => e.stopPropagation(),
      },
    };

    return (
      <div {...checkboxData}>
        <div class={this._addPrefix('checker')}>
          <label>
            <span
              class={this._addPrefix('wrapper')}
              tabIndex={this.disabled ? -1 : this.tabindex}
            >
              <input {...iptData} />
              <span class={this._addPrefix('inner')} />
            </span>
            {this.$slots.default}
          </label>
        </div>
      </div>
    );
  },

  methods: {
    _setChecked(checked, event) {
      this.innerChecked = checked;

      this.$emit(
        'change',
        _.isUndefined(this.value) ? checked : this.value,
        checked,
        event
      );

      if (findComponentUpward(this, 'FormItem', false)) {
        this.$parent.dispatch('change');
      }
    },

    _resetChecked(event) {
      this.$nextTick(() => {
        if (event.target.checked === this.currentChecked) return;

        event.target.checked = this.currentChecked;
      });
    },

    _handleChange(event) {
      event.stopPropagation();

      const value = event.target.checked;

      this._setChecked(value, event);
      this._resetChecked(event);
    },

    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
