import VueTypes from 'vue-types';
import _ from 'lodash';
import prefix, { defaultClassPrefix } from 'utils/prefix';
import { splitDataByComponent } from 'utils/split';

import Ripple from 'components/Ripple';

const CLASS_PREFIX = 'picker-toggle';

export default {
  name: 'PickerToggle',

  props: {
    hasValue: VueTypes.bool.def(false),
    cleanable: VueTypes.bool.def(false),
    caret: VueTypes.bool,
    active: VueTypes.bool.def(false),

    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
    componentClass: VueTypes.oneOfType([VueTypes.string, VueTypes.object]).def(
      'a'
    ),

    // slot

    // @clean
  },

  computed: {
    classes() {
      return [
        this.componentClass === 'a'
          ? this.classPrefix
          : this._addPrefix('custom'),
        { active: this.active },
      ];
    },
  },

  render() {
    const Component = this.componentClass;
    const data = splitDataByComponent(
      {
        class: this.classes,
        splitProps: { ...this.$attrs, role: 'button', tabindex: -1 },
        on: _.omit(this.$listeners, ['clean']),
      },
      Component
    );

    return (
      <Component {...data}>
        <span class={this._addPrefix(this.hasValue ? 'value' : 'placeholder')}>
          {this.$slots.default}
        </span>
        {this.hasValue && this.cleanable && (
          <span
            class={this._addPrefix('clean')}
            role="button"
            tabindex="-1"
            onClick={this._handleClean}
          >
            ✕
          </span>
        )}
        {this.caret && <span class={this._addPrefix('caret')} />}
        <Ripple />
      </Component>
    );
  },

  methods: {
    _handleClean(event) {
      event.stopPropagation();

      this.$emit('clean', event);
    },

    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
