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
    componentClass: VueTypes.oneOfType([VueTypes.string, VueTypes.object]).def(
      'button'
    ),
  },

  computed: {
    classes() {
      const addPrefix = prefix(this.classPrefix);

      return [
        this.classPrefix,
        addPrefix(this.appearance),
        {
          [addPrefix(this.color)]: true,
          [addPrefix(this.size)]: true,
          [addPrefix('active')]: this.active,
          [addPrefix('disabled')]: this.disabled,
          [addPrefix('loading')]: this.loading,
          [addPrefix('block')]: this.block,
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
        on: { ...this.$listeners },
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
      props: {
        ...this.$attrs,
        disabled: this.disabled,
      },
      on: { ...this.$listeners },
    };

    // https://stackoverflow.com/questions/41904199/whats-the-point-of-button-type-button
    if (Component === 'button') {
      btnData.props.type = this.$attrs.type || 'button';
    }

    return (
      <Component {...btnData}>
        {this.loading && spin}
        {this.$slots.default}
      </Component>
    );
  },
};
