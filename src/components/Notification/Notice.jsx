import VueTypes from 'vue-types';
import _ from 'lodash';
import prefix, { defaultClassPrefix } from 'utils/prefix';
import { STATUS } from 'utils/constant';

const CLASS_PREFIX = 'alert';

export default {
  name: 'Notice',

  props: {
    duration: VueTypes.number,
    content: VueTypes.oneOfType([
      VueTypes.string,
      VueTypes.arrayOf(VueTypes.oneOfType([VueTypes.string, VueTypes.func])),
      VueTypes.func,
    ]), // slot
    closable: VueTypes.bool.def(false),
    type: VueTypes.oneOf(STATUS),
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
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

  render(h) {
    let content = this.$slots.content || this.content;

    if (typeof content === 'function') {
      content = content(h);
    }

    if (_.isArray(content)) {
      content = content.map(c => (typeof c === 'function' ? c(h) : c));
    }

    return (
      <div class={this._addPrefix('notice-wrapper')}>
        <div class={this.classes}>
          <div class={this._addPrefix('notice-content')}>{content}</div>
          {this.closable && (
            <div
              class={this._addPrefix('notice-close')}
              role="button"
              tabIndex="-1"
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
