import VueTypes from 'vue-types';
import prefix, { defaultClassPrefix } from 'utils/prefix';

const CLASS_PREFIX = 'form';

export default {
  name: 'Form',

  props: {
    layout: VueTypes.oneOf(['horizontal', 'vertical', 'inline']).def(
      'vertical'
    ),
    fluid: VueTypes.bool.def(false),
    checkDelay: VueTypes.number.def(500),
    checkTrigger: VueTypes.oneOf(['change', 'blur', 'none']).def('change'),
    model: VueTypes.object,
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
    // onChange
    // onError
    // onCheck
  },

  render() {
    return null;
  },

  methods: {
    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
