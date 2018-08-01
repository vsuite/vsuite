import VueTypes from 'vue-types';
import tinycolor from 'tinycolor2';
import prefix, { defaultClassPrefix } from 'utils/prefix';

const CLASS_PREFIX = 'loadingbar';
const STATUS = {
  LOADING: 'active',
  ERROR: 'fail',
};

function validColor(val) {
  return tinycolor(val).isValid();
}

export default {
  name: 'LoadingBar',

  props: {
    color: VueTypes.custom(validColor, '`strokeColor` is not valid').def(
      '#2196f3'
    ),
    failedColor: VueTypes.custom(validColor, '`strokeColor` is not valid').def(
      '#f44336'
    ),
    height: VueTypes.number.def(2),
    progress: VueTypes.bool,
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
  },

  data() {
    return {
      percent: this.progress ? 0 : 100,
      status: STATUS.LOADING,
      show: false,
    };
  },

  computed: {
    classes() {
      return [];
    },
  },


};
