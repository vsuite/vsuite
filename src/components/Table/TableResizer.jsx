import VueTypes from 'vue-types';
import _ from 'lodash';
import prefix, { defaultClassPrefix } from 'utils/prefix';
import DOMMouseMoveTracker from 'utils/DOMMouseMoveTracker';

const CLASS_PREFIX = 'table-column-resize-spanner';

export default {
  name: 'TableResizer',

  props: {
    columnWidth: VueTypes.number,
    columnLeft: VueTypes.number,
    columnFixed: VueTypes.bool.def(false),
    height: VueTypes.number,
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
  },

  data() {
    return {
      columnWidthM: this.columnWidth || 0,
    };
  },

  watch: {
    columnWidth() {
      this.columnWidthM = this.columnWidth || 0;
    },
  },

  beforeDestroy() {
    if (this.mouseMoveTracker) {
      this.mouseMoveTracker.releaseMouseMoves();
      this.mouseMoveTracker = null;
    }
  },

  render() {
    const data = {
      class: this.classPrefix,
      style: {
        left: `${this.columnWidthM + this.columnLeft - 2}px`,
        height: `${this.height}px`,
      },
      attrs: { role: 'button', tabindex: -1 },
      on: { mousedown: this._handleMouseDown },
    };

    return <div {...data} />;
  },

  methods: {
    _handleMouseDown(event) {
      this.mouseMoveTracker = this._getMouseMoveTracker();
      this.isKeyDown = true;
      this.cursorDelta = 0;

      this.mouseMoveTracker.captureMouseMoves(event);

      this.$emit('column-resize-start', {
        clientX: event.clientX,
        clientY: event.clientY,
        preventDefault: () => {},
      });
    },

    _handleMouseMove(deltaX) {
      if (!this.isKeyDown) return;

      this.cursorDelta += deltaX;

      this.columnWidthM = _.clamp(
        this.columnWidth + this.cursorDelta,
        20,
        20000
      );

      this.$emit(
        'column-resize-move',
        this.columnWidthM,
        this.columnLeft,
        this.columnFixed
      );
    },

    _handleMoveUp() {
      this.isKeyDown = false;

      if (this.mouseMoveTracker) {
        this.mouseMoveTracker.releaseMouseMoves();
        this.mouseMoveTracker = null;
      }

      this.$emit('column-resize-end', this.columnWidthM, this.cursorDelta);
    },

    _getMouseMoveTracker() {
      return (
        this.mouseMoveTracker ||
        new DOMMouseMoveTracker(
          this._handleMouseMove,
          this._handleMoveUp,
          document.body
        )
      );
    },

    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
