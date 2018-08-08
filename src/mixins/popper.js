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
  },

  data() {
    return {
      currentVal: this.defaultVisible,
    };
  },

  computed: {
    show() {
      return (
        !this.disabled &&
        ((typeof this.visible === 'undefined'
          ? this.currentVal
          : this.visible) ||
          this.always)
      );
    },
    triggerList() {
      return _.isString(this.trigger) ? [this.trigger] : this.trigger;
    },
  },

  watch: {
    show(val) {
      if (val) this._updatePopper();

      this.$emit(val ? 'show' : 'hide');
      this.$emit('change', val);
    },
    triggerList(triggers, oldTriggers) {
      const removeListenerList = _.difference(oldTriggers, triggers);
      const addListenerList = _.difference(triggers, oldTriggers);

      this._addListeners(addListenerList);
      this._removeListeners(removeListenerList);
    },
  },

  mounted() {
    if (this.show) this._updatePopper();

    this._addListeners();
  },

  beforeDestroy() {
    this._removeListeners();
  },

  methods: {
    _addListeners(triggers) {
      triggers = triggers || this.triggerList;

      const target = this.$refs.reference;

      // click
      if (~triggers.indexOf('click')) {
        on(target, 'click', this._handleClick);
      }
    },

    _removeListeners(triggers) {
      triggers = triggers || this.triggerList;

      // TODO: remove event listeners
    },

    _handleClick() {
      this.currentVal = !this.currentVal;
    },

    _handleRightClick(e) {
      e.preventDefault();

      this.currentVal = !this.currentVal;

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
        modifiers: this.popperJSModifiers || {},
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
