import VueTypes from 'vue-types';
import _ from 'lodash';
import Icon from 'components/Icon';
import prefix, { defaultClassPrefix } from 'utils/prefix';
import renderX, { RenderX } from 'utils/render';
import { IconX } from 'utils/svg';
import invariant from 'utils/invariant';

import STATUS from './status';

const CLASS_PREFIX = 'steps-item';

export default {
  name: 'StepItem',

  props: {
    title: RenderX,
    description: RenderX,
    icon: IconX,
    status: VueTypes.oneOf([
      STATUS.WAIT,
      STATUS.PROCESS,
      STATUS.FINISH,
      STATUS.ERROR,
    ]),
    itemWidth: VueTypes.oneOfType([VueTypes.string, VueTypes.number]),
    stepNumber: VueTypes.number,

    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),

    // slot-title
    // slot-description
    // slot-icon
  },

  computed: {
    hasTitle() {
      invariant.not(
        this.title && this.$slots.title,
        'You cannot use property title and slot title at same time. Please pick one way.'
      );

      return this.title || this.$slots.title;
    },

    hasDescription() {
      invariant.not(
        this.description && this.$slots.description,
        'You cannot use property description and slot description at same time. Please pick one way.'
      );

      return this.description || this.$slots.description;
    },

    hasIcon() {
      invariant.not(
        this.icon && this.$slots.icon,
        'You cannot use property icon and slot icon at same time. Please pick one way.'
      );

      return this.icon || this.$slots.icon;
    },

    classes() {
      return [
        this.classPrefix,
        this._addPrefix(`status-${this.status}`),
        { [this._addPrefix('custom')]: this.hasIcon },
      ];
    },
  },

  render(h) {
    const stepItemData = {
      class: this.classes,
      style: {
        width: _.isNumber(this.itemWidth)
          ? `${this.itemWidth}px`
          : this.itemWidth,
      },
      attrs: this.$attrs,
      on: this.$listeners,
    };
    const contentNode =
      this.hasTitle || this.hasDescription ? (
        <div class={this._addPrefix('content')}>
          {this.hasTitle && (
            <div class={this._addPrefix('title')}>
              {(this.title && renderX(h, this.title)) || this.$slots.title}
            </div>
          )}
          {this.hasDescription && (
            <div class={this._addPrefix('description')}>
              {(this.description && renderX(h, this.description)) ||
                this.$slots.description}
            </div>
          )}
        </div>
      ) : null;
    let iconNode = (
      <span class={this._addPrefix(['icon', `icon-${this.status}`])}>
        {this.stepNumber}
      </span>
    );

    if (this.hasIcon) {
      iconNode = (
        <span class={this._addPrefix('icon')}>
          {this.icon && <Icon icon={this.icon} size="lg" />}
          {this.$slots.icon}
        </span>
      );
    }

    return (
      <div {...stepItemData}>
        <div class={this._addPrefix('tail')} />
        <div
          class={this._addPrefix([
            'icon-wrapper',
            this.hasIcon ? 'custom-icon' : '',
          ])}
        >
          {iconNode}
        </div>
        {contentNode}
      </div>
    );
  },

  methods: {
    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
