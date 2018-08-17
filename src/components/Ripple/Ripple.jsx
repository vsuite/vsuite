import VueTypes from 'vue-types';
import { on, getOffset, addStyle } from 'shares/dom';
import prefix, { defaultClassPrefix } from 'utils/prefix';

const CLASS_PREFIX = 'ripple';

export default {
  name: 'Ripple',

  props: {
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
  },

  data() {
    return {
      rippling: false,
      position: {},
    };
  },

  computed: {},

  mounted() {
    this._handleAddMouseDownListener();
  },

  beforeDestroy() {
    this._handleRemoveMouseDownListener();
  },

  render() {
    const rippleWrapperData = {
      class: this._addPrefix('pond'),
      ref: 'trigger',
    };
    const rippleData = {
      class: this.classPrefix,
      style: this.position,
      directives: [{ name: 'show', value: this.rippling }],
      ref: 'ripple',
    };

    return (
      <span {...rippleWrapperData}>
        <transition name="ripple" onAfterEnter={this._handleAfterEnter}>
          <span {...rippleData} />
        </transition>
      </span>
    );
  },

  methods: {
    _handleAddMouseDownListener() {
      const trigger = this.$refs.trigger && this.$refs.trigger.parentNode;

      if (!trigger) return;

      this.mousedownListener = on(
        trigger,
        'mousedown',
        this._handleMouseDown,
        true
      );
    },

    _handleRemoveMouseDownListener() {
      if (this.mousedownListener) {
        this.mousedownListener.off();

        this.mousedownListener = null;
      }
    },

    _handleMouseDown(event) {
      this.position = this._computedPosition(event);

      addStyle(this.$refs.ripple, 'display', 'block');

      requestAnimationFrame(() => (this.rippling = true));

      this.$emit('mousedown', event);
    },

    _handleAfterEnter() {
      this.rippling = false;
    },

    _computedPosition(event) {
      const trigger = this.$refs.trigger;
      const offset = getOffset(trigger);
      const offsetX = (event.x || event.pageX || 0) - offset.left;
      const offsetY = (event.y || event.pageY || 0) - offset.top;

      const radiusX = Math.max(offset.width - offsetX, offsetX);
      const radiusY = Math.max(offset.height - offsetY, offsetY);
      const radius = Math.sqrt(Math.pow(radiusX, 2) + Math.pow(radiusY, 2));

      return {
        width: `${radius * 2}px`,
        height: `${radius * 2}px`,
        left: `${offsetX - radius}px`,
        top: `${offsetY - radius}px`,
      };
    },

    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
