import VueTypes from 'vue-types';
import prefix, { defaultClassPrefix } from 'utils/prefix';

const CLASS_PREFIX = 'divider';

export default {
  name: 'Divider',

  props: {
    vertical: VueTypes.bool.def(false),
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
    componentClass: VueTypes.oneOfType([VueTypes.string, VueTypes.object]).def(
      'div'
    ),
  },

  computed: {
    withText() {
      return !!this.$slots.default;
    },
    classes() {
      return [
        this.classPrefix,
        {
          [this._addPrefix('vertical')]: this.vertical,
          [this._addPrefix('horizontal')]: !this.vertical,
          [this._addPrefix('with-text')]: this.withText,
        },
      ];
    },
  },

  render() {
    const Component = this.componentClass;
    const dividerData = {
      class: this.classes,
      attrs: this.$attrs,
      on: this.$listeners,
    };

    return (
      <Component {...dividerData}>
        {this.withText ? (
          <span class={this._addPrefix('inner-text')}>
            {this.$slots.default}
          </span>
        ) : null}
      </Component>
    );
  },

  methods: {
    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
