import VueTypes from 'vue-types';
import _ from 'lodash';
import { getOffset, getWidth, getHeight, addStyle, on } from 'shares/dom';
import DOMMouseMoveTracker from 'utils/DOMMouseMoveTracker';
import prefix, { defaultClassPrefix } from 'utils/prefix';

import Tooltip from 'components/Tooltip';
import { findComponentUpward } from 'utils/find';

const CLASS_PREFIX = 'slider';

export default {
  name: 'Slider',

  model: {
    prop: 'value',
    event: 'change',
  },

  props: {
    value: {
      type: Number,
      default: undefined,
    },
    defaultValue: VueTypes.number,
    min: VueTypes.number,
    max: VueTypes.number.def(100),
    step: VueTypes.number.def(1),
    disabled: VueTypes.bool.def(false),
    graduated: VueTypes.bool.def(false),
    tooltip: VueTypes.bool,
    progress: VueTypes.bool.def(false),
    vertical: VueTypes.bool.def(false),
    handleTitle: VueTypes.string,
    handleClassName: VueTypes.string,
    handleStyle: VueTypes.object,
    barClassName: VueTypes.string,
    barStyle: VueTypes.object,
    renderHandleTitle: Function,
    renderMark: Function,
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
  },

  data() {
    return {
      innerVal: this._checkValue(
        _.isUndefined(this.value) ? this.defaultValue : this.value
      ),
      barWidth: 0,
      barHeight: 0,
      handleDown: false,
    };
  },

  computed: {
    hasMark() {
      return !!this.$scopedSlots.mark || !!this.renderMark;
    },

    classes() {
      return [
        this.classPrefix,
        {
          [this._addPrefix('vertical')]: this.vertical,
          [this._addPrefix('disabled')]: this.disabled,
          [this._addPrefix('graduated')]: this.graduated,
          [this._addPrefix('dragging')]: this.handleDown,
          [this._addPrefix('with-mark')]: this.hasMark,
        },
      ];
    },

    currentVal() {
      return this._checkValue(
        _.isUndefined(this.value) ? this.innerVal : this.value
      );
    },

    currentMax() {
      return (
        Math.floor((this.max - this.min) / this.step) * this.step + this.min
      );
    },

    splitCount() {
      return (this.currentMax - this.min) / this.step;
    },
  },

  mounted() {
    this._updateBar();
    this._handleAddResizeListener();
  },

  beforeDestroy() {
    this._releaseMoveMoves();
    this._handleRemoveResizeListener();
  },

  render(h) {
    return (
      <div class={this.classes} role="presentation" onClick={this._handleClick}>
        <div class={[this._addPrefix('bar'), this.barClassName]} ref="bar">
          {this.progress && this._renderProgress(h)}
          {this.graduated && this._renderGraduated(h)}
        </div>
        {this._renderHandle(h)}
      </div>
    );
  },

  methods: {
    _renderProgress() {
      const key = this.vertical ? 'height' : 'width';
      const styles = {
        [key]: `${((this.currentVal - this.min) /
          (this.currentMax - this.min)) *
          100}%`,
      };

      return <div class={this._addPrefix('progress-bar')} style={styles} />;
    },

    _renderGraduated(h) {
      const graduatedItems = [];
      const pass = this.currentVal / this.step - this.min / this.step;
      const active = Math.ceil(
        ((this.currentVal - this.min) / (this.currentMax - this.min)) *
          this.splitCount
      );

      for (let i = 0; i < this.splitCount; i++) {
        let styles = {};
        let classes = {
          [this._addPrefix('pass')]: i <= pass,
          [this._addPrefix('active')]: i === active,
        };

        if (this.barHeight && this.vertical) {
          styles.height = `${this.barHeight / this.splitCount}px`;
        }

        const mark = i * this.step + this.min;
        const last = i === this.splitCount - 1;

        graduatedItems.push(
          <li class={classes} style={styles} key={i}>
            {this._renderMark(h, mark)}
            {last && this._renderMark(h, this.currentMax, true)}
          </li>
        );
      }

      return (
        <div class={this._addPrefix('graduator')}>
          <ul>{graduatedItems}</ul>
        </div>
      );
    },

    _renderMark(h, mark, last) {
      const classes = [
        this._addPrefix('mark'),
        {
          [this._addPrefix('last-mark')]: last,
        },
      ];

      if (this.hasMark) {
        return (
          <span class={classes}>
            <span class={this._addPrefix('mark-content')}>
              {this.$scopedSlots.mark &&
                this.$scopedSlots.mark({
                  mark,
                  currentVal: this.currentVal,
                })}
              {this.renderMark && this.renderMark(h, mark, this.currentVal)}
            </span>
          </span>
        );
      }

      return null;
    },

    _renderHandle(h) {
      const direction = this.vertical ? 'top' : 'left';
      const styles = {
        ...(this.handleStyle || {}),
        [direction]: `${((this.currentVal - this.min) /
          (this.currentMax - this.min)) *
          100}%`,
      };
      const handleClasses = [
        this._addPrefix('handle'),
        this.handleClassName,
        {
          [this._addPrefix('showtip')]: this.handleDown,
        },
      ];

      return (
        <div
          class={handleClasses}
          style={styles}
          role="presentation"
          ref="handle"
          onMousedown={this._handleMouseDown}
          onMouseenter={this._handleMouseEnter}
        >
          {this.tooltip && (
            <Tooltip
              inline
              class={this._addPrefix('tooltip')}
              title={`${this.currentVal}`}
            />
          )}
          {this.$scopedSlots.handleTitle &&
            this.$scopedSlots.handleTitle({ currentVal: this.currentVal })}
          {this.renderHandleTitle && this.renderHandleTitle(h, this.currentVal)}
          {this.handleTitle}
        </div>
      );
    },

    _handleClick(event) {
      if (this.disabled) return;

      const bar = this.$refs.bar;
      const barOffset = getOffset(bar);
      const offset = this.vertical
        ? event.pageY - barOffset.top
        : event.pageX - barOffset.left;

      this._setVal(
        this._checkValue(this._calculateValue(offset) + this.min),
        event
      );
    },

    _handleMouseDown(event) {
      if (this.disabled) return;

      this.mouseMoveTracker =
        this.mouseMoveTracker ||
        new DOMMouseMoveTracker(
          this._handleDragMove,
          this._handleDragEnd,
          document.body
        );

      this.mouseMoveTracker.captureMouseMoves(event);

      this.handleDown = true;
    },

    _handleMouseEnter() {
      this._setTooltipPosition();
    },

    _handleDragMove(deltaX, deltaY, event) {
      if (!this.mouseMoveTracker || !this.mouseMoveTracker.isDragging()) return;

      const bar = this.$refs.bar;
      const barOffset = getOffset(bar);
      const offset = this.vertical
        ? event.pageY - barOffset.top
        : event.pageX - barOffset.left;

      this._setVal(
        this._checkValue(this._calculateValue(offset) + this.min),
        event
      );
      this._setTooltipPosition();
    },

    _handleDragEnd() {
      this._releaseMoveMoves();

      this.handleDown = false;
    },

    _releaseMoveMoves() {
      if (!this.mouseMoveTracker) return;

      this.mouseMoveTracker.releaseMouseMoves();

      this.mouseMoveTracker = null;
    },

    _handleAddResizeListener() {
      this.onWindowResizeListener =
        this.onWindowResizeListener ||
        on(window, 'resize', _.debounce(this._handleWindowResize, 100));
    },

    _handleRemoveResizeListener() {
      if (!this.onWindowResizeListener) return;

      this.onWindowResizeListener.off();

      this.onWindowResizeListener = null;
    },

    _handleWindowResize() {
      this._updateBar();
    },

    _setVal(val, event) {
      this.innerVal = val;

      this.$emit('change', val, event);

      if (findComponentUpward(this, 'FormItem', false)) {
        this.$parent.dispatch('change');
      }
    },

    _calculateValue(offset) {
      const count = this.splitCount;

      let value = 0;

      if (isNaN(offset)) {
        return value;
      }

      if (this.vertical) {
        value = Math.round(offset / (this.barHeight / count)) * this.step;
      } else {
        value = Math.round(offset / (this.barWidth / count)) * this.step;
      }

      return value;
    },

    _checkValue(val) {
      if (val < this.min) {
        return this.min;
      }

      if (val > this.currentMax) {
        return this.currentMax;
      }

      return val || 0;
    },

    _updateBar() {
      const bar = this.$refs.bar;

      if (!bar) return;

      this.barWidth = getWidth(bar);
      this.barHeight = getHeight(bar);
    },

    _setTooltipPosition() {
      if (!this.tooltip) return;

      const handle = this.$refs.handle;
      const tip = handle.querySelector(`.${this._addPrefix('tooltip')}`);
      const width = getWidth(tip);

      addStyle(tip, 'left', `-${width / 2}px`);
    },

    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
