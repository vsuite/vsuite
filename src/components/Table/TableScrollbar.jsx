import VueTypes from 'vue-types';
import _ from 'lodash';
import { addStyle } from 'shares/dom';
import prefix, { defaultClassPrefix } from 'utils/prefix';
import translateDOMPositionXY from 'utils/translateDOMPositionXY';

import { SCROLLBAR_MIN_WIDTH } from './constants';

const CLASS_PREFIX = 'table-scrollbar';

export default {
  name: 'TableScrollbar',

  props: {
    vertical: VueTypes.bool.def(false),
    length: VueTypes.number.def(1),
    scrollLength: VueTypes.number.def(1),
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
    // onScroll, onMousedown
  },

  data() {
    return {
      scrollOffset: 0,
      barOffset: {
        top: 0,
        left: 0,
      },
      handlePressed: false,
    };
  },

  computed: {
    classes() {
      return [
        this.classPrefix,
        {
          [this._addPrefix('vertical')]: this.vertical,
          [this._addPrefix('horizontal')]: !this.vertical,
          [this._addPrefix('hide')]: this.scrollLength <= this.length,
          [this._addPrefix('pressed')]: this.handlePressed,
        },
      ];
    },

    styles() {
      return {
        [this.vertical ? 'height' : 'width']: `${(this.length /
          this.scrollLength) *
          100}%`,
        [this.vertical ? 'minHeight' : 'minWidth']: SCROLLBAR_MIN_WIDTH,
      };
    },
  },

  render() {
    const barData = {
      ref: 'bar',
      class: this.classes,
      attrs: { role: 'toolbar' },
      on: {
        ...this.$listeners,
        click: this._handleClick,
      },
    };
    const handleData = {
      ref: 'handle',
      class: this._addPrefix('handle'),
      style: this.styles,
      attrs: { role: 'button', tabindex: '-1' },
      on: { mousedown: this._handleMouseDown },
    };

    return (
      <div {...barData}>
        <div {...handleData} />
      </div>
    );
  },

  methods: {
    _updateScrollBarPosition(delta, forceDelta) {
      const max =
        this.scrollLength && this.length
          ? this.length - (this.length / this.scrollLength) * this.length
          : 0;
      const styles = {};

      if (_.isUndefined(forceDelta)) {
        this.scrollOffset += delta;
        this.scrollOffset = Math.max(this.scrollOffset, 0);
        this.scrollOffset = Math.min(this.scrollOffset, max);
      } else {
        this.scrollOffset = forceDelta || 0;
      }

      if (this.vertical) {
        translateDOMPositionXY(styles, 0, this.scrollOffset);
      } else {
        translateDOMPositionXY(styles, this.scrollOffset, 0);
      }

      addStyle(this.$refs.handle, styles);
    },

    _handleScroll(delta, event) {
      const scrollDelta = delta * (this.scrollLength / this.length);

      this._updateScrollBarPosition(delta);

      this.$emit('scroll', scrollDelta, event);
    },

    _handleClick(event) {
      const $handle = this.$refs.handle;

      if ($handle && $handle.contains(event.target)) {
        return;
      }

      const offset = this.vertical
        ? event.pageY - this.barOffset.top
        : event.pageX - this.barOffset.left;

      const handleWidth = (this.length / this.scrollLength) * this.length;
      const delta = offset - handleWidth;

      const nextDelta =
        offset > this.scrollOffset
          ? delta - this.scrollOffset
          : offset - this.scrollOffset;

      this._handleScroll(nextDelta, event);
    },

    _handleMouseDown() {},

    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
