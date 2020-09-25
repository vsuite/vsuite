import VueTypes from 'vue-types';
import prefix, { defaultClassPrefix } from 'utils/prefix';
import { splitDataByComponent } from 'utils/split';
import { IconX } from 'utils/svg';

import Icon from 'components/Icon';

const CLASS_PREFIX = 'breadcrumb';

export default {
  name: 'Breadcrumb',

  props: {
    // eslint-disable-next-line
    separator: {
      ...IconX,
      default: 'angle-right',
    },

    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
    componentClass: VueTypes.oneOfType([VueTypes.string, VueTypes.object]).def(
      'ol'
    ),

    // slot
    // slot-separator
  },

  render() {
    const children = this.$slots.default || [];
    const len = children.length;
    let items = [];

    children.forEach((vnode, index) => {
      items.push(vnode);

      if (index < len - 1) {
        items.push(
          <li class={this._addPrefix('separator')} key={index}>
            {this.$slots.separator ||
              (this.separator && <Icon icon={this.separator} />)}
          </li>
        );
      }
    });

    const Component = this.componentClass;
    const data = splitDataByComponent(
      {
        class: this.classPrefix,
        splitProps: {
          ...this.$attrs,
          role: 'navigation',
          'aria-label': 'breadcrumbs',
        },
        on: this.$listeners,
      },
      Component
    );

    return <Component {...data}>{items}</Component>;
  },

  methods: {
    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
