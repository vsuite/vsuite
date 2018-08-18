import VueTypes from 'vue-types';
import _ from 'lodash';
import prefix, { defaultClassPrefix } from 'utils/prefix';

const CLASS_PREFIX = 'radio';

export default {
  name: 'Radio',

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
    const radioData = {
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
        type: 'radio',
        disabled: this.disabled,
      },
      on: {
        change: this._handleChange,
        click: e => e.stopPropagation(),
      },
    };

    return (
      <div {...radioData}>
        <div class={this._addPrefix('checker')} role="button">
          <label>
            <span
              class={this._addPrefix('wrapper')}
              tabindex={this.disabled ? -1 : this.tabindex}
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

      event.target.checked = this.currentChecked;

      this.$emit(
        'change',
        checked,
        _.isUndefined(this.value) ? checked : this.value,
        event
      );
    },

    _handleChange(event) {
      event.stopPropagation();

      this._setChecked(event.target.checked, event);
    },

    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
