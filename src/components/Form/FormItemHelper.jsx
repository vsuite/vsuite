import VueTypes from 'vue-types';
import prefix, { defaultClassPrefix } from 'utils/prefix';

import Tooltip from 'components/Tooltip';
import Icon from 'components/Icon';

const CLASS_PREFIX = 'help-block';

export default {
  name: 'FormItemHelper',

  props: {
    htmlFor: VueTypes.string,
    tooltip: VueTypes.bool,
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
  },

  computed: {
    classes() {
      return [
        this.classPrefix,
        {
          [this._addPrefix('tooltip')]: this.tooltip,
        },
      ];
    },
  },

  render() {
    if (this.tooltip) {
      return (
        <Tooltip class={this._addPrefix('tooltip')} placement="top-end">
          <template slot="title">{this.$slots.default}</template>
          <span class={this.classPrefix}>
            <Icon icon="question-circle-o" />
          </span>
        </Tooltip>
      );
    }

    return (
      <span class={this.classes} for={this.htmlFor}>
        {this.$slots.default}
      </span>
    );
  },

  methods: {
    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
