import VueTypes from 'vue-types';
import SafeAnchor from 'components/SafeAnchor';
import prefix, { defaultClassPrefix } from 'utils/prefix';

// import PaginationButton from './PaginationButton.jsx';

const CLASS_PREFIX = 'pagination';

// select
// i18n

export default {
  name: 'Pagination',

  props: {
    activePage: VueTypes.number.def(1),
    pages: VueTypes.number.def(1),
    maxButtons: VueTypes.number,
    boundaryLinks: VueTypes.bool.def(false),
    ellipsis: VueTypes.bool.def(false), // slot
    first: VueTypes.bool.def(false), // slot
    last: VueTypes.bool.def(false), // slot
    prev: VueTypes.bool.def(false), // slot
    next: VueTypes.bool.def(false), // slot
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
    buttonComponentClass: VueTypes.oneOfType([
      VueTypes.string,
      VueTypes.object,
    ]).def(SafeAnchor),
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
