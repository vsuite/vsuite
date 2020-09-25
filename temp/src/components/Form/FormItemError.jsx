import VueTypes from 'vue-types';
import prefix, { defaultClassPrefix } from 'utils/prefix';

const CLASS_PREFIX = 'error-message';

export default {
  name: 'FormItemError',

  props: {
    show: VueTypes.bool.def(false),
    placement: VueTypes.string,
    htmlFor: VueTypes.string,
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
  },

  computed: {
    classes() {
      return [
        this.classPrefix,
        {
          [this._addPrefix('show')]: this.show,
        },
      ];
    },

    wrapperClasses() {
      return [
        this._addPrefix('wrapper'),
        {
          [this._addPrefix(`placement-${this.placement}`)]: this.placement,
        },
      ];
    },
  },

  render() {
    return (
      <div class={this.wrapperClasses}>
        <div class={this.classes} for={this.htmlFor}>
          <span class={this._addPrefix('arrow')} />
          <span class={this._addPrefix('inner')}>{this.$slots.default}</span>
        </div>
      </div>
    );
  },

  methods: {
    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
