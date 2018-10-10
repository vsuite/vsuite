import VueTypes from 'vue-types';
import prefix, { defaultClassPrefix } from 'utils/prefix';

import TableScrollbar from './TableScrollbar.jsx';

const CLASS_PREFIX = '';

export default {
  name: 'Table',

  props: {
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
  },

  render() {
    return (
      <div>
        <TableScrollbar />
      </div>
    );
  },

  methods: {
    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
