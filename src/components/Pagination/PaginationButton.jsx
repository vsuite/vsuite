import VueTypes from 'vue-types';
import SafeAnchor from 'components/SafeAnchor';
import Ripple from 'components/Ripple';
import prefix, { defaultClassPrefix } from 'utils/prefix';

const CLASS_PREFIX = 'pagination-btn';

export default {
  name: 'PaginationButton',

  props: {
    eventKey: VueTypes.any,
    disabled: VueTypes.bool.def(false),
    active: VueTypes.bool.def(false),
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
    componentClass: VueTypes.oneOfType([VueTypes.string, VueTypes.object]).def(
      SafeAnchor
    ),
  },

  computed: {
    classes() {
      return [
        this.classPrefix,
        {
          [this._addPrefix('active')]: this.active,
          [this._addPrefix('disabled')]: this.disabled,
        },
      ];
    },
  },

  render() {
    const Component = this.componentClass;
    const data = {
      props: {
        ...this.$attrs,
        disabled: this.disabled,
      },
      on: {
        click: this._handleClick,
      },
    };

    return (
      <li class={this.classes}>
        <Component {...data}>
          {this.$slots.default}
          <Ripple />
        </Component>
      </li>
    );
  },

  methods: {
    _handleClick(event) {
      this.$emit('click', event);

      if (this.disabled) return;

      this.$emit('select', this.eventKey, event);
    },

    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
