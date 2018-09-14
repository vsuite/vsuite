import VueTypes from 'vue-types';
import _ from 'lodash';
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
    value: VueTypes.object,
    defaultValue: VueTypes.object.def(() => ({})),
    model: VueTypes.any, // schema
    checkDelay: VueTypes.number.def(500),
    checkTrigger: VueTypes.oneOf(['change', 'blur', 'focus']).def('change'),
    errorPlacement: VueTypes.oneOf(Popper.placements).def('bottom-start'),
    errorTooltip: VueTypes.bool,
    helpTooltip: VueTypes.bool,
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
    // change, error, check
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
    return null;
  },

  methods: {
    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },

    check() {},

    cleanErrors() {},
  },
};
