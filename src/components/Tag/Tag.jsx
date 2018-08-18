import VueTypes from 'vue-types';
import prefix, { defaultClassPrefix } from 'utils/prefix';
import { COLORS } from 'utils/constant';

const CLASS_PREFIX = 'tag';

export default {
  name: 'Tag',

  props: {
    color: VueTypes.oneOf(COLORS),
    closable: VueTypes.bool.def(false),
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
    componentClass: VueTypes.oneOfType([VueTypes.string, VueTypes.object]).def(
      'div'
    ),
  },

  computed: {
    classes() {
      return [
        this.classPrefix,
        {
          [this._addPrefix(this.color)]: this.color,
          [this._addPrefix('closeable')]: this.closable,
        },
      ];
    },
  },

  render() {
    const Component = this.componentClass;
    const tagData = {
      class: this.classes,
      attrs: this.$attrs,
      on: this.$listeners,
    };

    return (
      <Component {...tagData}>
        <span class={this._addPrefix('text')}>{this.$slots.default}</span>
        {this.closable && (
          <i
            role="button"
            tabindex="-1"
            class={this._addPrefix('icon-close')}
            onClick={this._handleClose}
          />
        )}
      </Component>
    );
  },

  methods: {
    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },

    _handleClose(e) {
      this.$emit('close', e);
    },
  },
};
