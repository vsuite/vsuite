import VueTypes from 'vue-types';
import { defaultClassPrefix } from 'utils/prefix';

const CLASS_PREFIX = 'icon-stack';

export default {
  functional: true,

  name: 'IconStack',

  props: {
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
    componentClass: VueTypes.oneOfType([VueTypes.string, VueTypes.object]).def(
      'span'
    ),
  },

  render(h, context) {
    const { classPrefix, componentClass } = context.props;
    const classes = [CLASS_PREFIX, classPrefix];
    const Component = componentClass;
    const $slots = context.slots();

    return <Component class={classes}>{$slots.default}</Component>;
  },
};
