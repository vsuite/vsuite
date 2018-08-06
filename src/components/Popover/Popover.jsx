import VueTypes from 'vue-types';
import Popper from 'popper.js';

export default {
  name: 'Popover',

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
    trigger: VueTypes.oneOf(['click', 'hover', 'focus', 'active']).def('click'),
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
  },

  watch: {
    cVisible(val) {
      if (val) this._updatePopper();

      this.$emit(val ? 'show' : 'hide');
      this.$emit('change', val);
    },
  },

  mounted() {
    if (this.cVisible) this._updatePopper();
  },

  render() {
    // let children = this.$slots.default && this.$slots.default[0];
    // let content = this.$slots.content && this.$slots.content[0];
    //
    // if (children) children = cloneElement(children, { ref: 'reference' });
    // if (content)
    //   content = cloneElement(content, {
    //     ref: 'popper',
    //     directives: [{ name: 'show', value: this.cVisible }],
    //   });
    // {/*{children}*/}
    // {/*<transition name="fade">{content}</transition>*/}
    const wrapperData = {
      ref: 'popper',
      directives: [{ name: 'show', value: this.cVisible }],
    };

    return (
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <div ref="reference">{this.$slots.default}</div>
        <transition name="fade">
          <div {...wrapperData}>{this.$slots.content}</div>
        </transition>
      </div>
    );
  },

  methods: {
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

    _handleUpdate() {
      this.$emit('update');
    },
  },
};
