import VueTypes from 'vue-types';
import prefix, { defaultClassPrefix } from 'utils/prefix';

const CLASS_PREFIX = 'auto-complete-item';

export default {
  name: 'AutoCompleteItem',

  props: {
    focus: VueTypes.bool.def(false),
    itemData: VueTypes.shape({ label: VueTypes.any, value: VueTypes.any }),
    renderItem: Function,
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
  },

  computed: {
    classes() {
      return [
        this.classPrefix,
        {
          [this._addPrefix('focus')]: this.focus,
        },
      ];
    },
  },

  render(h) {
    const liProps = {
      attrs: {
        ...this.$attrs,
        role: 'menuitem',
      },
    };
    const aProps = {
      class: this.classes,
      attrs: {
        tabindex: -1,
        role: 'button',
      },
      on: {
        ...this.$listeners,
        click: this._handleClick,
      },
    };

    return (
      <li {...liProps}>
        <a {...aProps}>
          {(this.renderItem && this.renderItem(h, this.itemData)) ||
            this.$slots.default ||
            this.itemData.label}
        </a>
      </li>
    );
  },

  methods: {
    _handleClick(event) {
      this.$emit('click', { ...this.itemData }, event);
    },

    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
