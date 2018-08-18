import VueTypes from 'vue-types';
import _ from 'lodash';
import { cloneElement, getName, getProps } from 'utils/node';
import prefix, { defaultClassPrefix } from 'utils/prefix';
import shadowEqual from 'utils/shadowEqual';
import invariant from 'utils/invariant';

const CLASS_PREFIX = 'radio-group';

export default {
  name: 'RadioGroup',

  model: {
    prop: 'value',
    event: 'change',
  },

  props: {
    value: VueTypes.any,
    inline: VueTypes.bool.def(false),
    disabled: VueTypes.bool.def(false),
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
  },

  data() {
    return {
      innerVal: this.value,
    };
  },

  computed: {
    currentVal() {
      return _.isUndefined(this.value) ? this.innerVal : this.value;
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

      return cloneElement(vnode, {
        props: {
          inline: this.inline,
          disabled: this.disabled || childProps.disabled,
          checked: shadowEqual(this.currentVal, childProps.value),
        },
        on: { change: this._handleChange },
      });
    });

    return (
      <div class={this.classPrefix} role="button">
        {children}
      </div>
    );
  },

  methods: {
    _setVal(val, event) {
      this.innerVal = val;

      this.$emit('change', val, event);
    },

    _handleChange(_, value, event) {
      this._setVal(value, event);
    },

    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
