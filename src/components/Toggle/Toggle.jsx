import VueTypes from 'vue-types';
import _ from 'lodash';
import prefix, { defaultClassPrefix } from 'utils/prefix';
import { findComponentUpward } from 'utils/find';
import { SIZES } from 'utils/constant';
import renderX, { RenderX } from 'utils/render';

const CLASS_PREFIX = 'btn-toggle';

export default {
  name: 'Toggle',

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
    disabled: VueTypes.bool.def(false),
    size: VueTypes.oneOf(SIZES),
    open: RenderX,
    close: RenderX,
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
          [this._addPrefix('disabled')]: this.disabled,
          [this._addPrefix('checked')]: this.currentChecked,
          [this._addPrefix(this.size)]: this.size,
        },
      ];
    },

    currentChecked() {
      return _.isUndefined(this.checked) ? this.innerChecked : this.checked;
    },
  },

  render(h) {
    const toggleData = {
      class: this.classes,
      attrs: { role: 'button', tabindex: -1 },
      on: { click: this._handleClick },
    };

    return (
      <span {...toggleData}>
        <span class={this._addPrefix('inner')}>
          {this.currentChecked
            ? this.$slots.open || renderX(h, this.open)
            : this.$slots.close || renderX(h, this.close)}
        </span>
      </span>
    );
  },

  methods: {
    _setChecked(checked, event) {
      this.innerChecked = checked;

      this.$emit('change', checked, event);

      if (findComponentUpward(this, 'FormItem', false)) {
        this.$parent.dispatch('change');
      }
    },

    _handleClick(event) {
      if (this.disabled) return;

      const checked = !this.currentChecked;

      this._setChecked(checked, event);
    },

    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
