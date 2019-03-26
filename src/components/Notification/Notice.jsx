import VueTypes from 'vue-types';
import prefix, { defaultClassPrefix } from 'utils/prefix';
import { STATUS } from 'utils/constant';

const CLASS_PREFIX = 'alert';

export default {
  name: 'Notice',

  props: {
    duration: VueTypes.number,
    content: VueTypes.string, // slot
    closable: VueTypes.bool.def(false),
    type: VueTypes.oneOf(STATUS),

    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),

    // slot-content

    // @close
  },

  computed: {
    classes() {
      return [
        this._addPrefix('notice'),
        {
          [this._addPrefix('notice-closable')]: this.closable,
          [this._addPrefix(this.type)]: !!this.type,
        },
      ];
    },
  },

  mounted() {
    this._setClearTimer();
  },

  beforeDestroy() {
    this._clearCloseTimer();
  },

  render() {
    return (
      <div class={this._addPrefix('notice-wrapper')}>
        <div class={this.classes}>
          <div class={this._addPrefix('notice-content')}>
            {this.content || this.$slots.content}
          </div>
          {this.closable && (
            <div
              class={this._addPrefix('notice-close')}
              role="button"
              tabindex="-1"
              onClick={this._handleClose}
            >
              <span class={this._addPrefix('notice-close-x')} />
            </div>
          )}
        </div>
      </div>
    );
  },

  methods: {
    _handleClose() {
      this._clearCloseTimer();
      this.$emit('close');
    },

    _setClearTimer() {
      if (this.duration) {
        this.closeTimer = setTimeout(() => {
          this._handleClose();
        }, this.duration);
      }
    },

    _clearCloseTimer() {
      if (this.closeTimer) {
        clearTimeout(this.closeTimer);

        this.closeTimer = null;
      }
    },

    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
