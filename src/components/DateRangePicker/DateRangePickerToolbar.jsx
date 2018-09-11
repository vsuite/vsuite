/*
 * Copyright (c) 2015-present, blackcater all right reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import VueTypes from 'vue-types';
import prefix, { defaultClassPrefix } from 'utils/prefix';

const CLASS_PREFIX = '';

export default {
  name: 'DateRangePicker',

  props: {
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
