import VueTypes from 'vue-types';
import _ from 'lodash';
import { cloneElement, getName, getProps } from 'utils/node';
import prefix, { defaultClassPrefix } from 'utils/prefix';
import { findComponentUpward } from 'utils/find';
import shallowEqual from 'utils/shallowEqual';
import invariant from 'utils/invariant';
import { mergeElement } from 'utils/merge';

const CLASS_PREFIX = 'radio-group';

export default {
  name: 'RadioGroup',

  model: {
    prop: 'value',
    event: 'change',
  },

  props: {
    appearance: VueTypes.oneOf(['default', 'picker']).def('default'),
    value: VueTypes.any,
    defaultValue: VueTypes.any,
    inline: VueTypes.bool.def(false),
    disabled: VueTypes.bool.def(false),

    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),

    // slot

    // @change
  },

  data() {
    return {
      innerVal: _.isUndefined(this.value) ? this.defaultValue : this.value,
    };
  },

  computed: {
    currentVal() {
      return _.isUndefined(this.value) ? this.innerVal : this.value;
    },

    classes() {
      return [
        this.classPrefix,
        this._addPrefix(this.appearance),
        { [this._addPrefix('inline')]: this.inline },
      ];
    },
  },

  render() {
    let children = this.$slots.default || [];

    children = children.map(vnode => {
      const name = getName(vnode);

      if (name !== 'Radio') return vnode;

      const childProps = getProps(vnode);

      invariant.not(
        _.isUndefined(childProps.value),
        'If you use <RadioGroup>, <Radio> component should contain `value` property'
      );

      return mergeElement(
        cloneElement(vnode, {
          props: {
            inline: this.inline,
            disabled: this.disabled || childProps.disabled,
            checked: shallowEqual(this.currentVal, childProps.value),
          },
        }),
        { on: { change: this._handleChange } }
      );
    });

    return (
      <div class={this.classes} role="button">
        {children}
      </div>
    );
  },

  methods: {
    _setVal(val, event) {
      this.innerVal = val;

      this.$emit('change', val, event);

      if (findComponentUpward(this, 'FormItem', false)) {
        this.$parent.dispatch('change');
      }
    },

    _handleChange(value, _, event) {
      this._setVal(value, event);
    },

    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
