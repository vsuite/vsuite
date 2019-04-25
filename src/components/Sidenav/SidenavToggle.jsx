import VueTypes from 'vue-types';
import prefix, { defaultClassPrefix } from 'utils/prefix';

import Button from 'components/Button';

const IconButton = Button.Icon;
const CLASS_PREFIX = 'sidenav-toggle';

export default {
  name: 'SidenavToggle',

  props: {
    expanded: VueTypes.bool,

    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),

    // @toggle
  },

  computed: {
    classes() {
      return [this.classPrefix, { collapsed: !this.expanded }];
    },
  },

  render() {
    const data = {
      class: this.classes,
      attrs: this.$attrs,
    };

    return (
      <div {...data}>
        <IconButton
          appearance="default"
          icon={this.expanded ? 'angle-right' : 'angle-left'}
          onClick={this._handleToggle}
        />
      </div>
    );
  },

  methods: {
    _handleToggle(event) {
      this.$emit('toggle', !this.expanded, event);
    },

    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
