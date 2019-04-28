import VueTypes from 'vue-types';
import prefix, { defaultClassPrefix } from 'utils/prefix';
import { splitDataByComponent } from 'utils/split';

import SafeAnchor from 'components/SafeAnchor';

const CLASS_PREFIX = 'breadcrumb-item';

export default {
  name: 'BreadcrumbItem',

  props: {
    active: VueTypes.bool.def(false),

    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
    componentClass: VueTypes.oneOfType([VueTypes.string, VueTypes.object]).def(
      SafeAnchor
    ),

    // slot
  },

  computed: {
    classes() {
      return [this.classPrefix, { [this._addPrefix('active')]: this.active }];
    },
  },

  render() {
    let content;

    if (this.active) {
      const data = {
        attrs: this.$attrs,
        on: this.$listeners,
      };

      content = <span {...data}>{this.$slots.default}</span>;
    } else {
      const Component = this.componentClass;

      const data = splitDataByComponent(
        { splitProps: this.$attrs, on: this.$listeners },
        Component
      );

      content = <Component {...data}>{this.$slots.default}</Component>;
    }

    return <li class={this.classes}>{content}</li>;
  },

  methods: {
    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
