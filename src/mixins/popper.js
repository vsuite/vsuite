import VueTypes from 'vue-types';
import _ from 'lodash';
import Popper from 'popper.js';
import { transferDom } from 'directives';
import { directive as clickOutside } from 'v-click-outside-x';

const TRIGGERS = ['click', 'right-click', 'hover', 'focus', 'active'];

function validTrigger(val) {
  let list = val;

  if (_.isString(val)) {
    list = [val];
  }

  if (!_.isArray(list)) return false;

  return list.every(v => ~TRIGGERS.indexOf(v));
}

export default {
  directives: { clickOutside, transferDom },

  props: {
    visible: {
      type: Boolean,
      default: undefined,
    },
    defaultVisible: VueTypes.bool.def(false),
    placement: VueTypes.oneOf(Popper.placements).def('auto'),
    trigger: VueTypes.custom(validTrigger).def('hover'),
    delay: VueTypes.number.def(100),
    delayShow: VueTypes.number,
    delayHide: VueTypes.number,
    transfer: VueTypes.bool.def(function() {
      return this.$VSUITE.transfer || false;
    }),
  },

  data() {
    return {
      innerVisible: _.isUndefined(this.visible)
        ? this.defaultVisible
        : this.visible,
    };
  },

  computed: {
    currentVisible() {
      return _.isUndefined(this.visible) ? this.innerVisible : this.visible;
    },
    triggerList() {
      return _.isString(this.trigger) ? [this.trigger] : this.trigger;
    },
  },

  watch: {
    currentVisible(val) {
      this.$emit(val ? 'show' : 'hide');
    },
  },

  mounted() {
    if (this.currentVisible) this._updatePopper();
  },

  updated() {
    if (this.currentVisible) this.$nextTick(() => this._updatePopper());
  },

  beforeDestroy() {
    this._destroyPopper();
  },

  methods: {
    show() {
      this._openPopper();
    },

    hide() {
      this._closePopper();
    },

    _addTriggerListeners(referenceData, containerData) {
      referenceData.on = referenceData.on || {};
      containerData.on = containerData.on || {};

      if (~this.triggerList.indexOf('click')) {
        referenceData.on.click = this._handlePopperClick;
      }

      if (~this.triggerList.indexOf('right-click')) {
        referenceData.on.contextmenu = this._handlePopperRightClick;
      }

      if (~this.triggerList.indexOf('active')) {
        referenceData.on.mousedown = this._handlePopperMouseDown;
      }

      if (~this.triggerList.indexOf('hover')) {
        containerData.on.mouseenter = this._handlePopperMouseEnter;
        containerData.on.mouseleave = this._handlePopperMouseLeave;
      }

      if (~this.triggerList.indexOf('focus')) {
        containerData.on['!focus'] = this._handlePopperFocus;
        // containerData.on['!blur'] = this._handlePopperBlur;
      }
    },

    _openPopper() {
      if (!this.currentVisible) {
        this._handleDelayShow(() => (this.innerVisible = true));
      }
    },

    _closePopper() {
      if (this.currentVisible) {
        this._handleDelayHide(() => (this.innerVisible = false));
      }
    },

    _handleClickOutside() {
      this._handleDelayHide(() => (this.innerVisible = false));
    },

    _handlePopperClick() {
      if (this.innerVisible) {
        this._handleDelayHide(() => (this.innerVisible = false));
      } else {
        this._handleDelayShow(() => (this.innerVisible = true));
      }
    },

    _handlePopperRightClick(e) {
      e.preventDefault();

      if (this.innerVisible) {
        this._handleDelayHide(() => (this.innerVisible = false));
      } else {
        this._handleDelayShow(() => (this.innerVisible = true));
      }

      return false;
    },

    _handlePopperMouseDown() {
      this._handleDelayShow(() => (this.innerVisible = true));
    },

    _handlePopperMouseEnter(e) {
      e.stopPropagation();

      this._handleDelayShow(() => (this.innerVisible = true));
    },

    _handlePopperMouseLeave(e) {
      e.stopPropagation();

      this._handleDelayHide(() => (this.innerVisible = false));
    },

    _handlePopperFocus() {
      this._handleDelayShow(() => (this.innerVisible = true));
    },

    _handlePopperBlur() {
      this._handleDelayHide(() => (this.innerVisible = false));
    },

    _handleDelayShow(cb) {
      const delay = this.delayShow || this.delay || 100;

      if (this.delayShowTimer) {
        clearTimeout(this.delayShowTimer);

        this.delayShowTimer = null;
      }
      if (this.delayHideTimer) {
        clearTimeout(this.delayHideTimer);

        this.delayHideTimer = null;
      }

      this.delayShowTimer = setTimeout(() => {
        this.$nextTick(() => {
          cb && cb();

          this.$emit('visible-change', true);
        });
      }, delay);
    },

    _handleDelayHide(cb) {
      const delay = this.delayHide || this.delay || 100;

      if (this.delayShowTimer) {
        clearTimeout(this.delayShowTimer);

        this.delayShowTimer = null;
      }
      if (this.delayHideTimer) {
        clearTimeout(this.delayHideTimer);

        this.delayHideTimer = null;
      }

      this.delayHideTimer = setTimeout(() => {
        this.$nextTick(() => {
          cb && cb();

          this.$emit('visible-change', false);
        });
      }, delay);
    },

    _createPopper() {
      const reference =
        (this.$refs.reference && this.$refs.reference.$el) ||
        this.$refs.reference;
      const popper =
        (this.$refs.popper && this.$refs.popper.$el) || this.$refs.popper;
      const arrow =
        (this.$refs.arrow && this.$refs.arrow.$el) || this.$refs.arrow;

      if (!reference || !popper) return;

      let options = {
        placement: this.placement,
        onCreate: this._handleCreate,
        // onUpdate: this._handleUpdate,
      };

      if (arrow) {
        options = _.merge(options, {
          modifiers: {
            arrow: {
              element: arrow,
            },
          },
        });
      }

      options = _.merge(options, this.popperOptions || {});

      this.popperJS = new Popper(reference, popper, options);
    },

    _updatePopper() {
      this.popperJS ? this.popperJS.update() : this._createPopper();
    },

    _destroyPopper() {
      if (this.popperJS) {
        this.popperJS.destroy();
        this.popperJS = undefined;
      }
    },

    _handleCreate() {
      this.$nextTick(this._updatePopper);
    },
  },
};
