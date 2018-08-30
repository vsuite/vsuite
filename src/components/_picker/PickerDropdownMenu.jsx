import VueTypes from 'vue-types';
import prefix, { defaultClassPrefix } from 'utils/prefix';

const CLASS_PREFIX = 'picker';

export default {
  name: 'PickerDropdownMenu',

  props: {
    data: VueTypes.arrayOf(VueTypes.any).def([]),
    disabledItemValues: VueTypes.arrayOf(VueTypes.any).def([]),
    activeItemValues: VueTypes.arrayOf(VueTypes.any).def([]),
    focusItemValue: VueTypes.any,
    group: VueTypes.bool.def(false),
    maxHeight: VueTypes.number.def(320),
    valueKey: VueTypes.string.def('value'),
    labelKey: VueTypes.string.def('label'),
    renderMenuGroup: Function,
    renderMenuItem: Function,
    dropdownMenuItemClassPrefix: VueTypes.string,
    dropdownMenuItemComponentClass: VueTypes.oneOfType([
      VueTypes.string,
      VueTypes.object,
    ]),
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
    // select
    // toggle
  },

  render(h) {
    const data = {
      class: this._addPrefix('items'),
      style: { maxHeight: `${this.maxHeight}px` },
      ref: 'menuBodyContainer',
    };

    return (
      <div {...data}>
        <ul>{this._renderItem(h)}</ul>
      </div>
    );
  },

  methods: {
    _renderItems(h) {},

    // update scroll position
    _updateScrollPosition() {},

    _handleSelect() {},

    _handleToggle() {},

    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
