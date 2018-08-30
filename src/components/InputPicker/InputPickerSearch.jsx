import VueTypes from 'vue-types';
import _ from 'lodash';
import prefix, { defaultClassPrefix } from 'utils/prefix';
import { splitDataByComponent } from 'utils/split';

const CLASS_PREFIX = 'picker-search';

export default {
  name: 'InputPickerSearch',

  model: {
    prop: 'value',
    event: 'change',
  },

  props: {
    value: String,
    defaultValue: VueTypes.string,
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
    componentClass: VueTypes.oneOfType([VueTypes.string, VueTypes.object]).def(
      'input'
    ),
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
  },

  render() {
    const Component = this.componentClass;
    let iptData = splitDataByComponent(
      {
        class: this._addPrefix('input'),
        splitProps: {
          ...this.$attrs,
          value: this.currentVal,
        },
        on: {
          ...this.$listeners,
          input: this._handleInput,
        },
      },
      Component
    );

    return (
      <div class={this.classPrefix}>
        <Component {...iptData}>{this.$slots.default}</Component>
      </div>
    );
  },

  methods: {
    _setVal(val, event) {
      this.innerVal = val;

      event.target.value = this.currentVal;

      this.$emit('change', val, event);
    },

    _handleInput(event) {
      this._setVal(event.target.value, event);
    },

    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
