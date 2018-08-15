import VueTypes from 'vue-types';
import prefix, { defaultClassPrefix } from 'utils/prefix';

// import ControlLabel from './ControlLabel.jsx';
// import HelpBlock from './HelpBlock.jsx';

const CLASS_PREFIX = 'form-group';

export default {
  name: 'FormItem',

  props: {
    name: VueTypes.string.isRequired,
    label: VueTypes.string, // slot
    labelFor: VueTypes.string,
    labelSrOnly: VueTypes.bool.def(false),
    help: VueTypes.string, // slot
    tooltip: VueTypes.bool.def(false),
    schema: VueTypes.object,
    error: VueTypes.oneOfType([VueTypes.bool, VueTypes.string]).def(false),
    model: VueTypes.object,
    checkDelay: VueTypes.number.def(500),
    checkTrigger: VueTypes.oneOf(['change', 'blur', 'none']).def('change'),
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
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
