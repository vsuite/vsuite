import VueTypes from 'vue-types';
import _ from 'lodash';
import { cloneElement, getName, getProps } from 'utils/node';
import prefix, { defaultClassPrefix } from 'utils/prefix';
import shadowEqual from 'utils/shadowEqual';
import invariant from 'utils/invariant';

const CLASS_PREFIX = 'checkbox-group';

export default {
  name: 'CheckboxGroup',

  model: {
    prop: 'value',
    event: 'change',
  },

  props: {
    value: VueTypes.arrayOf(VueTypes.any),
    inline: VueTypes.bool.def(false),
    disabled: VueTypes.bool.def(false),
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
  },

  data() {
    return {
      innerVal: this.value || [],
    };
  },

  computed: {
    currentVal() {
      return (_.isUndefined(this.value) ? this.innerVal : this.value) || [];
    },
  },

  render() {
    let children = this.$slots.default || [];

    children = children.map(vnode => {
      const name = getName(vnode);

      if (name !== 'Checkbox') return vnode;

      const childProps = getProps(vnode);

      invariant.not(
        _.isUndefined(childProps.value),
        'If you use <CheckboxGroup>, <Checkbox> component should contain `value` property'
      );

      return cloneElement(vnode, {
        props: {
          inline: this.inline,
          disabled: this.disabled || childProps.disabled,
          checked: this.currentVal.some(i => shadowEqual(i, childProps.value)),
        },
        on: { change: this._handleChange },
      });
    });

    return (
      <div class={this.classPrefix} role="group">
        {children}
      </div>
    );
  },

  methods: {
    _setVal(val) {
      const index = this.innerVal.indexOf(val);

      if (index !== -1) {
        this.innerVal.splice(index, 1);
      } else {
        this.innerVal.push(val);
      }

      this.$emit('change', _.cloneDeep(this.innerVal), event);
    },

    _handleChange(_, value, event) {
      this._setVal(value, event);
    },

    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
