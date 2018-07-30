import VueTypes from 'vue-types';
import { COLORS, SIZES } from 'utils/constant';
import prefix, { defaultClassPrefix } from 'utils/prefix';
import SafeAnchor from 'components/SafeAnchor';

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
    componentClass: VueTypes.string.def('button'),
  },

  computed: {
    classes() {
      return [
        this.classPrefix,
        this._addPrefix(this.appearance),
        {
          [this._addPrefix(this.color)]: true,
          [this._addPrefix(this.size)]: true,
          [this._addPrefix('active')]: this.active,
          [this._addPrefix('disabled')]: this.disabled,
          [this._addPrefix('loading')]: this.loading,
          [this._addPrefix('block')]: this.block,
        },
      ];
    },
  },

  render() {
    const spin = <span class={prefix(this.classPrefix, 'spin')} />;

    if (this.href) {
      const anchorData = {
        class: this.classes,
        props: {
          ...this.$attrs,
          href: this.href,
          disabled: this.disabled,
          role: 'button',
        },
        on: this.$listeners,
      };

      return (
        <SafeAnchor {...anchorData}>
          {this.loading && spin}
          {this.$slots.default}
        </SafeAnchor>
      );
    }

    const Component = this.componentClass;
    const btnData = {
      class: this.classes,
      attrs: {
        ...this.$attrs,
        disabled: this.disabled,
      },
      on: this.$listeners,
    };

    // https://stackoverflow.com/questions/41904199/whats-the-point-of-button-type-button
    if (Component === 'button') {
      btnData.attrs.type = this.$attrs.type || 'button';
    }

    return (
      <Component {...btnData}>
        {this.loading && spin}
        {this.$slots.default}
      </Component>
    );
  },

  methods: {
    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
