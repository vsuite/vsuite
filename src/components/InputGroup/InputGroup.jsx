import VueTypes from 'vue-types';
import prefix, { defaultClassPrefix } from 'utils/prefix';
import { cloneElement, isElementNode, isComponentNode } from 'utils/node';

const CLASS_PREFIX = 'input-group';

export default {
  name: 'InputGroup',

  props: {
    inside: VueTypes.bool.def(false),
    disabled: VueTypes.bool.def(false),
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
  },

  data() {
    return { focus: false };
  },

  computed: {
    classes() {
      return [
        this.classPrefix,
        {
          [this._addPrefix('inside')]: this.inside,
          [this._addPrefix('focus')]: this.focus,
          [this._addPrefix('disabled')]: this.disabled,
        },
      ];
    },
  },

  render(h) {
    return (
      <div class={this.classes}>
        {this.disabled ? this._renderDisabledChildren(h) : this.$slots.default}
      </div>
    );
  },

  methods: {
    _renderDisabledChildren() {
      const children = this.$slots.default || [];

      return children.map(vnode => {
        if (isElementNode(vnode)) {
          return cloneElement(vnode, { attrs: { disabled: this.disabled } });
        }

        if (isComponentNode(vnode)) {
          return cloneElement(vnode, { props: { disabled: this.disabled } });
        }

        return vnode;
      });
    },

    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
