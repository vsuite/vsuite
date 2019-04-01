import VueTypes from 'vue-types';
import Icon from 'components/Icon';
import prefix, { defaultClassPrefix } from 'utils/prefix';
import renderX, { RenderX } from 'utils/render';
import { STATUS, STATUS_ICON_NAMES } from 'utils/constant';
import invariant from 'utils/invariant';

const CLASS_PREFIX = 'message';

export default {
  name: 'Message',

  props: {
    type: VueTypes.oneOf(STATUS).def('info'),
    closable: VueTypes.bool.def(false),
    closeLabel: VueTypes.string.def('Close'),
    title: RenderX,
    description: RenderX,
    showIcon: VueTypes.bool.def(false),
    full: VueTypes.bool.def(false),

    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),

    // slot-title
    // slot-description

    // @close
  },

  data() {
    return {
      display: 'show',
    };
  },

  computed: {
    hasTitle() {
      invariant.not(
        this.title && this.$slots.title,
        'You cannot use property title and slot title at same time. Please pick one way.'
      );

      return this.title || this.$slots.title;
    },
    hasDesc() {
      invariant.not(
        this.description && this.$slots.description,
        'You cannot use property description and slot description at same time. Please pick one way.'
      );

      return this.description || this.$slots.description;
    },
    classes() {
      return [
        this.classPrefix,
        this._addPrefix(this.type),
        this._addPrefix(this.display),
        {
          [this._addPrefix('has-title')]: this.hasTitle,
          [this._addPrefix('has-icon')]: this.showIcon,
          [this._addPrefix('full')]: this.full,
        },
      ];
    },
  },

  render(h) {
    if (this.display === 'hide') return null;

    return (
      <div class={this.classes}>
        <div class={this._addPrefix('container')}>
          {this.closable && this._renderCloseButton(h)}
          {this.showIcon && (
            <div class={this._addPrefix('icon-wrapper')}>
              <Icon icon={STATUS_ICON_NAMES[this.type]} />
            </div>
          )}
          <div class={this._addPrefix('content')}>
            {this.hasTitle && (
              <h5 class={this._addPrefix('header')}>
                {(this.title && renderX(h, this.title)) || this.$slots.title}
              </h5>
            )}
            {this.hasDesc && (
              <div class={this._addPrefix('body')}>
                {(this.description && renderX(h, this.description)) ||
                  this.$slots.description}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  },

  methods: {
    _renderCloseButton() {
      return (
        <button
          type="button"
          class={this._addPrefix('btn-close')}
          onClick={this._handleClose}
        >
          <span aria-hidden="true">&times;</span>
          <span class="sr-only">{this.closeLabel}</span>
        </button>
      );
    },

    _handleClose() {
      this.display = 'hiding';

      setTimeout(() => {
        this.display = 'hide';
        this.$emit('close');
      }, 1000);
    },

    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
