import VueTypes from 'vue-types';
import { COLORS, SIZES } from 'utils/constant';
import prefix, { defaultClassPrefix } from 'utils/prefix';
import { splitDataByComponent } from 'utils/split';

import SafeAnchor from 'components/SafeAnchor';
import Ripple from 'components/Ripple';

const CLASS_PREFIX = 'btn';

export default {
  name: 'Button',

  props: {
    appearance: VueTypes.oneOf([
      'default',
      'primary',
      'link',
      'subtle',
      'ghost',
    ]).def('default'),
    color: VueTypes.oneOf(COLORS),
    size: VueTypes.oneOf(SIZES),
    active: VueTypes.bool.def(false),
    disabled: VueTypes.bool.def(false),
    loading: VueTypes.bool.def(false),
    block: VueTypes.bool.def(false),
    href: VueTypes.string,

    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
    componentClass: VueTypes.oneOfType([VueTypes.string, VueTypes.object]).def(
      'button'
    ),

    // slot

    // all events
  },

  computed: {
    classes() {
      return [
        this.classPrefix,
        this._addPrefix(this.appearance),
        {
          [this._addPrefix(this.color)]: this.color,
          [this._addPrefix(this.size)]: this.size,
          [this._addPrefix('active')]: this.active,
          [this._addPrefix('disabled')]: this.disabled,
          [this._addPrefix('loading')]: this.loading,
          [this._addPrefix('block')]: this.block,
        },
      ];
    },
  },

  render() {
    const spin = this.loading && <span class={this._addPrefix('spin')} />;
    const ripple = this.appearance !== 'link' &&
      this.appearance !== 'ghost' && <Ripple />;

    if (this.href) {
      const anchorData = splitDataByComponent(
        {
          class: this.classes,
          splitProps: {
            ...this.$attrs,
            href: this.href,
            disabled: this.disabled,
            role: 'button',
          },
          on: this.$listeners,
        },
        SafeAnchor
      );

      return (
        <SafeAnchor {...anchorData}>
          {spin}
          {this.$slots.default}
          {ripple}
        </SafeAnchor>
      );
    }

    const Component = this.componentClass;
    const btnData = splitDataByComponent(
      {
        class: this.classes,
        splitProps: {
          ...this.$attrs,
          disabled: this.disabled,
          // https://stackoverflow.com/questions/41904199/whats-the-point-of-button-type-button
          type:
            Component === 'button'
              ? this.$attrs.type || 'button'
              : this.$attrs.type,
        },
        on: this.$listeners,
      },
      Component
    );

    return (
      <Component {...btnData}>
        {spin}
        {this.$slots.default}
        {ripple}
      </Component>
    );
  },

  methods: {
    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
