import VueTypes from 'vue-types';
import _ from 'lodash';
import Popper from 'popper.js';
// import { clickOutside, transferDom } from 'directives';
// import { getName, getEl, cloneElement } from 'utils/node';
import { on } from 'shares/dom';

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
  model: {
    prop: 'visible',
    event: 'change',
  },

  props: {
    visible: {
      type: Boolean,
      default: undefined,
    },
    defaultVisible: VueTypes.bool.def(false),
    disabled: VueTypes.bool.def(false),
    always: VueTypes.bool.def(false),
    trigger: VueTypes.custom(validTrigger).def('click'),
    delay: VueTypes.number,
    delayShow: VueTypes.number,
    delayHide: VueTypes.number,

    // popper
    placement: VueTypes.oneOf(Popper.placements).def('auto'),
    positionFixed: VueTypes.bool.def(false),
    eventsEnabled: VueTypes.bool,
    removeOnDestroy: VueTypes.bool.def(false),

    // modifiers
    shift: VueTypes.shape({ enabled: VueTypes.bool }).loose.def({
      enabled: true,
    }),
    offset: VueTypes.shape({
      enabled: VueTypes.bool,
      offset: VueTypes.oneOfType([VueTypes.string, VueTypes.number]),
    }).loose.def({ enabled: true, offset: 0 }),
    preventOverflow: VueTypes.shape({
      enabled: VueTypes.bool,
      priority: VueTypes.array,
      padding: VueTypes.number,
      boundariesElement: VueTypes.oneOfType([
        VueTypes.oneOf(['scrollParent', 'window', 'viewport']),
        VueTypes.object,
      ]),
    }).loose.def({
      enabled: true,
      priority: ['left', 'right', 'top', 'bottom'],
      padding: 5,
      boundariesElement: 'scrollParent',
    }),
    keepTogether: VueTypes.shape({ enabled: VueTypes.bool }).loose.def({
      enabled: true,
    }),
    arrow: VueTypes.shape({
      enabled: VueTypes.bool,
      element: VueTypes.oneOfType([VueTypes.string, VueTypes.object]),
    }).loose.def({ enabled: true, element: '[x-arrow]' }),
    flip: VueTypes.shape({
      enabled: VueTypes.bool,
      behavior: VueTypes.oneOfType([
        VueTypes.oneOf(['flip', 'clockwise', 'counterclockwise']),
        VueTypes.array,
      ]),
      padding: VueTypes.number,
      boundariesElement: VueTypes.oneOfType([
        VueTypes.oneOf(['scrollParent', 'window', 'viewport']),
        VueTypes.object,
      ]),
    }).loose.def({
      enabled: true,
      behavior: 'flip',
      padding: 5,
      boundariesElement: 'viewport',
    }),
    inner: VueTypes.shape({ enabled: VueTypes.bool }).loose.def({
      enabled: false,
    }),
    hide: VueTypes.shape({ enabled: VueTypes.bool }).loose.def({
      enabled: true,
    }),
    computeStyle: VueTypes.shape({
      enabled: VueTypes.bool,
      gpuAcceleration: VueTypes.bool,
      // prettier-ignore
      x: VueTypes.oneOf(['\'bottom\'', '\'top\'']),
      // prettier-ignore
      y: VueTypes.oneOf(['\'left\'', '\'right\''])
    }).loose.def({
      enabled: true,
      gpuAcceleration: true,
      // prettier-ignore
      x: '\'bottom\'',
      // prettier-ignore
      y: '\'left\''
    }),
    applyStyle: VueTypes.shape({ enabled: VueTypes.bool }).loose.def({
      enabled: true,
    }),
  },

  data() {
    return {
      vVisible: this.defaultVisible,
    };
  },

  computed: {
    cVisible() {
      return (
        !this.disabled &&
        ((typeof this.visible === 'undefined' ? this.vVisible : this.visible) ||
          this.always)
      );
    },
    cTriggers() {
      return _.isString(this.trigger) ? [this.trigger] : this.trigger;
    },
  },

  watch: {
    cVisible(val) {
      if (val) this._updatePopper();

      this.$emit(val ? 'show' : 'hide');
      this.$emit('change', val);
    },
    cTriggers(triggers, oldTriggers) {
      const removeListenerList = _.difference(oldTriggers, triggers);
      const addListenerList = _.difference(triggers, oldTriggers);

      this._addListeners(addListenerList);
      this._removeListeners(removeListenerList);
    },
  },

  mounted() {
    if (this.cVisible) this._updatePopper();

    this._addListeners();
  },

  beforeDestroy() {
    this._removeListeners();
  },

  methods: {
    _addListeners(triggers) {
      triggers = triggers || this.cTriggers;

      const target = this.$refs.reference;

      // click
      if (~triggers.indexOf('click')) {
        on(target, 'click', this._handleClick);
      }
    },

    _removeListeners(triggers) {
      triggers = triggers || this.cTriggers;

      // TODO: remove event listeners
    },

    _handleClick() {
      this.vVisible = !this.vVisible;
    },

    _handleRightClick(e) {
      e.preventDefault();

      this.vVisible = !this.vVisible;

      return false;
    },

    _handleMouseOver() {},

    _handleMouseOut() {},

    _handleMouseDown() {},

    _handleMouseUp() {},

    _createPopper() {
      const reference = this.$refs.reference;
      const popper = this.$refs.popper;

      if (!reference || !popper) return;

      this.popperJS = new Popper(reference, popper, {
        placement: this.placement,
        positionFixed: this.positionFixed,
        eventsEnabled: this.eventsEnabled,
        removeOnDestroy: this.removeOnDestroy,
        onCreate: this._handleCreate,
        onUpdate: this._handleUpdate,
        modifiers: {
          shift: this.shift,
          offset: this.offset,
          preventOverflow: this.preventOverflow,
          keepTogether: this.keepTogether,
          arrow: this.arrow,
          flip: this.flip,
          inner: this.inner,
          hide: this.hide,
          applyStyle: this.applyStyle,
          computeStyle: this.computeStyle,
        },
      });
    },

    _updatePopper() {
      this.popperJS ? this.popperJS.update() : this._createPopper();
    },

    _handleCreate() {
      this.$nextTick(this._updatePopper);
      this.$emit('create');
    },

    _handleUpdate(data) {
      this.$emit('update');
      // console.dir(data);
    },
  },
};
