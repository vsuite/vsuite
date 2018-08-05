import VueTypes from 'vue-types';
import invariant from 'utils/invariant';
import prefix, { defaultClassPrefix } from 'utils/prefix';
import { getName, cloneElement } from 'utils/node';

const CLASS_PREFIX = 'row';

export default {
  name: 'Row',

  props: {
    gutter: {
      type: Number,
      default: undefined,
    },
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
    componentClass: VueTypes.oneOfType([VueTypes.string, VueTypes.object]).def(
      'div'
    ),
  },

  render(h) {
    const rowData = {
      class: this.classPrefix,
      attrs: this.$attrs,
      on: this.$listeners,
    };
    const Component = this.componentClass;
    let children = this.$slots.default || [];

    if (typeof this.gutter !== 'undefined') {
      const padding = this.gutter / 2;

      children = children.map((vnode, index) => {
        const name = getName(vnode);

        // prettier-ignore
        invariant.not(name && name !== 'Col', '<Row>\'s children must be <Col>');

        return cloneElement(vnode, {
          style: { paddingLeft: `${padding}px`, paddingRight: `${padding}px` },
        });
      });

      rowData.style = {
        marginLeft: `-${padding}px`,
        marginRight: `-${padding}px`,
      };
    }

    return <Component {...rowData}>{children}</Component>;
  },

  methods: {
    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
