import VueTypes from 'vue-types';
import _ from 'lodash';
import prefix, { defaultClassPrefix } from 'utils/prefix';

import { Collapse } from 'components/Animation';

const CLASS_PREFIX = 'dropdown-menu-group';

export default {
  name: 'PickerDropdownMenuGroup',

  props: {
    title: VueTypes.string,

    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),

    // slot

    // @click
    // @toggle
  },

  data() {
    return { expanded: true };
  },

  computed: {
    classes() {
      return [
        this.classPrefix,
        { [this._addPrefix('closed')]: !this.expanded },
      ];
    },
  },

  render() {
    const data = {
      class: this.classes,
      attrs: this.$attrs,
      on: _.omit(this.$listeners, ['toggle', 'click']),
    };
    const listData = {
      class: this._addPrefix('children'),
      directives: [{ name: 'show', value: this.expanded }],
    };

    return (
      <li {...data}>
        <div
          class={this._addPrefix('title')}
          role="menuitem"
          tabindex={-1}
          onClick={this._handleClickGroup}
        >
          <span>{this.$slots.title || this.title}</span>
          <span className={this._addPrefix('caret')} />
        </div>
        <Collapse>
          <ul {...listData}>{this.$slots.default}</ul>
        </Collapse>
      </li>
    );
  },

  methods: {
    _handleClickGroup(event) {
      this.expanded = !this.expanded;

      // this.$emit('click', event);
      this.$emit('toggle', event);
    },

    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
