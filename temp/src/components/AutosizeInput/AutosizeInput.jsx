// https://github.com/JedWatson/react-input-autosize/blob/master/src/AutosizeInput.js
import VueTypes from 'vue-types';
import _ from 'lodash';
import { splitDataByComponent } from 'utils/split';
import { isIE } from 'shares/browser';

const sizerStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  visibility: 'hidden',
  height: 0,
  overflow: 'scroll',
  whiteSpace: 'pre',
};
const copyStyles = (styles, node) => {
  node.style.fontSize = styles.fontSize;
  node.style.fontFamily = styles.fontFamily;
  node.style.fontWeight = styles.fontWeight;
  node.style.fontStyle = styles.fontStyle;
  node.style.letterSpacing = styles.letterSpacing;
  node.style.textTransform = styles.textTransform;
};

const generateId = () => {
  // we only need an auto-generated ID for stylesheet injection, which is only
  // used for IE. so if the browser is not IE, this should return undefined.
  return (
    '_' +
    Math.random()
      .toString(36)
      .substr(2, 12)
  );
};

export default {
  name: 'AutosizeInput',

  props: {
    value: VueTypes.any,
    defaultValue: VueTypes.any,
    type: VueTypes.any,
    extraWidth: VueTypes.oneOfType([VueTypes.number, VueTypes.string]),
    uid: String,
    injectStyles: VueTypes.bool,
    inputClassName: VueTypes.string,
    inputStyle: VueTypes.object,
    minWidth: VueTypes.oneOfType([VueTypes.number, VueTypes.string]).def(1),
    placeholder: VueTypes.string,
    placeholderIsMinWidth: VueTypes.bool.def(false),
  },

  data() {
    return {
      inputId: generateId(),
      inputWidth: this.minWidth,
    };
  },

  watch: {
    inputWidth(val, oldVal) {
      if (val !== oldVal) {
        this.$emit('autosize', val);
      }
    },
  },

  mounted() {
    this.isMounted = true;
    this._copyInputStyles();
    this._updateInputWidth();
  },

  updated() {
    this._updateInputWidth();
  },

  beforeDestroy() {
    this.isMounted = false;
  },

  render() {
    const sizerValue =
      (_.isUndefined(this.value) ? this.defaultValue : this.value) || '';

    const inputStyle = {
      boxSizing: 'content-box',
      width: `${this.inputWidth}px`,
      ...this.inputStyle,
    };

    const inputData = splitDataByComponent(
      {
        id: this.inputId,
        class: this.inputClassName,
        style: inputStyle,
        splitProps: {
          ...this.$attrs,
          value: sizerValue,
          defaultValue: this.defaultValue,
          type: this.type,
          uid: this.uid,
          placeholder: this.placeholder,
        },
        on: _.omit(this.$listeners, ['autosize']),
        ref: 'input',
      },
      'input'
    );

    return (
      <div style={{ display: 'inline-block' }}>
        {this._renderStyles()}
        <input {...inputData} />
        <div style={sizerStyle} ref="sizer">
          {sizerValue}
        </div>
        {this.placeholder ? (
          <div style={sizerStyle} ref="placeholderSizer">
            {this.placeholder}
          </div>
        ) : null}
      </div>
    );
  },

  methods: {
    _renderStyles() {
      const data = {
        domProps: {
          innerHTML: `input#${this.inputId}::-ms-clear {display: none;}`,
        },
      };

      return isIE() && this.injectStyles ? <style {...data} /> : null;
    },

    getInput() {
      return this.$refs.input;
    },

    focus() {
      this.$refs.input && this.$refs.input.focus();
    },

    blur() {
      this.$refs.input && this.$refs.input.blur();
    },

    select() {
      this.$refs.input && this.$refs.input.select();
    },

    _copyInputStyles() {
      if (!this.isMounted || !window.getComputedStyle) return;

      const input = this.$refs.input;
      const sizer = this.$refs.sizer;
      const placeholderSizer = this.$refs.placeholderSizer;
      const inputStyles = input && window.getComputedStyle(input);

      if (!inputStyles) return;

      copyStyles(inputStyles, sizer);

      if (placeholderSizer) copyStyles(inputStyles, placeholderSizer);
    },

    _updateInputWidth() {
      const sizer = this.$refs.sizer;
      const placeholderSizer = this.$refs.placeholderSizer;

      if (
        !this.isMounted ||
        !sizer ||
        _.isUndefined(sizer && sizer.scrollWidth)
      )
        return;

      let newInputWidth;

      if (
        this.placeholder &&
        (!this.value || (this.value && this.placeholderIsMinWidth))
      ) {
        newInputWidth =
          Math.max(sizer.scrollWidth, placeholderSizer.scrollWidth) + 2;
      } else {
        newInputWidth = sizer.scrollWidth + 2;
      }

      // add extraWidth to the detected width. for number types, this defaults to 16 to allow for the stepper UI
      const extraWidth =
        this.type === 'number' && this.extraWidth === undefined
          ? 16
          : parseInt(this.extraWidth) || 0;

      newInputWidth += extraWidth;

      if (newInputWidth < this.minWidth) {
        newInputWidth = this.minWidth;
      }

      if (newInputWidth !== this.inputWidth) {
        this.inputWidth = newInputWidth;
      }
    },
  },
};
