import VueTypes from 'vue-types';
import invariant from 'utils/invariant';
import { defaultClassPrefix } from 'utils/prefix';
import { getName, cloneElement } from 'utils/node';

const CLASS_PREFIX = 'timeline';

export default {
  name: 'Timeline',

  props: {
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
    componentClass: VueTypes.oneOfType([VueTypes.string, VueTypes.object]).def(
      'ul'
    ),
  },

  render() {
    const Component = this.componentClass;
    const timelineData = {
      class: this.classPrefix,
      attrs: this.$attrs,
      on: this.$listeners,
    };
    const children = this.$slots.default || [];
    const count = children.length;
    const items = children.map((vnode, index) => {
      const name = getName(vnode);

      // prettier-ignore
      invariant.not(name && name !== 'TimelineItem', '<Timelime>\'s children must be <TimelineItem>');

      return cloneElement(vnode, { props: { last: index + 1 === count } });
    });

    return <Component {...timelineData}>{items}</Component>;
  },
};
