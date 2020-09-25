import VueTypes from 'vue-types';
import invariant from 'utils/invariant';
import { COLORS } from 'utils/constant';
import prefix, { defaultClassPrefix } from 'utils/prefix';
import { splitDataByComponent } from 'utils/split';

import Icon from 'components/Icon';

const CLASS_PREFIX = 'timeline-item';

export default {
  name: 'TimelineItem',

  props: {
    dot: VueTypes.string,
    color: VueTypes.oneOf(COLORS),
    last: VueTypes.bool.def(false),
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
    componentClass: VueTypes.oneOfType([VueTypes.string, VueTypes.object]).def(
      'li'
    ),
  },

  computed: {
    hasDot() {
      invariant.not(
        this.dot && this.$slots.dot,
        'You cannot use property dot and slot dot at same time. Please pick one way.'
      );

      return this.dot || this.$slots.dot;
    },

    classes() {
      return [
        this.classPrefix,
        {
          [this._addPrefix(this.color)]: this.color,
          [this._addPrefix('last')]: this.last,
        },
      ];
    },
  },

  render() {
    const Component = this.componentClass;
    const timelineItemData = splitDataByComponent(
      {
        class: this.classes,
        splitProps: this.$attrs,
        on: this.$listeners,
      },
      Component
    );

    return (
      <Component {...timelineItemData}>
        <span class={this._addPrefix('tail')} />
        <span
          class={[
            this._addPrefix('dot'),
            { [this._addPrefix('custom-dot')]: this.hasDot },
          ]}
        >
          {this.dot && <Icon icon={this.dot} />}
          {this.$slots.dot}
        </span>
        <div class={this._addPrefix('content')}>{this.$slots.default}</div>
      </Component>
    );
  },

  methods: {
    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
