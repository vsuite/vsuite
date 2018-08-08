import VueTypes from 'vue-types';
import _ from 'lodash';
import Popper from 'popper.js';
import prefix, { defaultClassPrefix } from 'utils/prefix';
import { on } from 'shares/dom';

const TRIGGERS = ['click', 'right-click', 'hover', 'focus', 'active'];
const CLASS_PREFIX = 'tooltip';

function validTrigger(val) {
  let list = val;

  if (_.isString(val)) {
    list = [val];
  }

  if (!_.isArray(list)) return false;

  return list.every(v => ~TRIGGERS.indexOf(v));
}

export default {
  name: 'Tooltip',

  props: {
    visible: {
      type: Boolean,
      default: undefined,
    },
    defaultVisible: VueTypes.bool.def(false),
    title: VueTypes.string,
    placement: VueTypes.oneOf(Popper.placements).def('auto'),
    disabled: VueTypes.bool.def(false),
    always: VueTypes.bool.def(false),
    trigger: VueTypes.custom(validTrigger).def('click'),
    delay: VueTypes.number,
    delayShow: VueTypes.number,
    delayHide: VueTypes.number,
    maxWidth: VueTypes.number.def(250),

    // popper
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
  },

  data() {
    return {
      innerVal: this.defaultVisible || false,
    };
  },

  computed: {
    innerClasses() {
      return [
        this._addPrefix('inner'),
        {
          [this._addPrefix('inner-with-width')]: !!this.maxWidth,
        },
      ];
    },
    currentVal() {
      return (
        !this.disabled &&
        ((typeof this.visible === 'undefined' ? this.innerVal : this.visible) ||
          this.always)
      );
    },
    triggerList() {
      return _.isString(this.trigger) ? [this.trigger] : this.trigger;
    },
  },

  watch: {
    currentVal(val) {
      if (val) this._updatePopper();

      this.$emit(val ? 'show' : 'hide');
      this.$emit('change', val);
    },
    triggerList(triggers, oldTriggers) {
      const removeListenerList = _.difference(oldTriggers, triggers);
      const addListenerList = _.difference(triggers, oldTriggers);

      this._removeListeners(removeListenerList);
      this._addListeners(addListenerList);
    },
  },

  mounted() {
    if (this.currentVal) this._updatePopper();

    this._addListeners();
  },

  beforeDestroy() {
    this._removeListeners();
  },

  render() {
    const tooltipData = {
      class: this._addPrefix('content'),
      style: {},
      directives: [{ name: 'show', value: this.currentVal }],
      ref: 'popper',
    };

    if (this.maxWidth) {
      tooltipData.style.maxWidth = `${this.maxWidth}px`;
    }

    return (
      <div class={this.classPrefix} ref="container">
        <div class={this._addPrefix('rel')} ref="reference">
          {this.$slots.default}
        </div>
        <transition name="tooltip-fade">
          <div {...tooltipData}>
            <div class={this._addPrefix('arrow')} ref="arrow" />
            <div class={this.innerClasses}>
              {this.title || this.$slots.title}
            </div>
          </div>
        </transition>
      </div>
    );
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
      this.innerVal = !this.innerVal;
    },

    _createPopper() {
      const reference = this.$refs.reference;
      const popper = this.$refs.popper;
      const arrow = this.$refs.arrow;

      if (!reference || !popper) return;

      this.popperJS = new Popper(reference, popper, {
        placement: this.placement,
        onCreate: this._handleCreate,
        onUpdate: this._handleUpdate,
        modifiers: {
          arrow: {
            element: arrow,
          },
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

    _handleUpdate() {
      this.$emit('update');
    },

    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
