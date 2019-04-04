import VueTypes from 'vue-types';
import tinycolor from 'tinycolor2';
import prefix, { defaultClassPrefix } from 'utils/prefix';

const CLASS_PREFIX = 'progress';

function validColor(val) {
  return tinycolor(val).isValid();
}

export default {
  name: 'ProgressCircle',

  props: {
    percent: VueTypes.number,
    strokeWidth: VueTypes.number.def(6),
    strokeColor: VueTypes.custom(validColor, '`strokeColor` is not valid'),
    trailWidth: VueTypes.number.def(6),
    trailColor: VueTypes.custom(validColor, '`trailColor` is not valid'),
    showInfo: VueTypes.bool,
    status: VueTypes.oneOf(['success', 'fail', 'active']),
    strokeLinecap: VueTypes.oneOf(['round', 'square', 'butt']).def('round'),
    gapPosition: VueTypes.oneOf(['top', 'right', 'bottom', 'left']).def('top'),
    gapDegree: VueTypes.number,
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
  },

  computed: {
    classes() {
      return [
        this.classPrefix,
        this._addPrefix('circle'),
        {
          [this._addPrefix(`circle-${this.status || ''}`)]: this.status,
        },
      ];
    },

    pathString() {
      const radius = 50 - this.strokeWidth / 2;

      let beginPositionX = 0;
      let beginPositionY = -radius;
      let endPositionX = 0;
      let endPositionY = -2 * radius;

      if (this.gapPosition === 'left') {
        beginPositionX = -radius;
        beginPositionY = 0;
        endPositionX = 2 * radius;
        endPositionY = 0;
      } else if (this.gapPosition === 'right') {
        beginPositionX = radius;
        beginPositionY = 0;
        endPositionX = -2 * radius;
        endPositionY = 0;
      } else if (this.gapPosition === 'bottom') {
        beginPositionY = radius;
        endPositionY = 2 * radius;
      }

      return `M 50,50 m ${beginPositionX},${beginPositionY}
     a ${radius},${radius} 0 1 1 ${endPositionX},${-endPositionY}
     a ${radius},${radius} 0 1 1 ${-endPositionX},${endPositionY}`;
    },

    trailPathStyle() {
      const radius = 50 - this.strokeWidth / 2;
      const len = Math.PI * 2 * radius;

      return {
        stroke: this.trailColor ? tinycolor(this.trailColor).toHexString() : '',
        strokeDasharray: `${len - this.gapDegree}px ${len}px`,
        strokeDashoffset: `-${this.gapDegree / 2}px`,
      };
    },

    strokePathStyle() {
      const radius = 50 - this.strokeWidth / 2;
      const len = Math.PI * 2 * radius;

      return {
        stroke: this.strokeColor
          ? tinycolor(this.strokeColor).toHexString()
          : '',
        strokeDasharray: `${(this.percent / 100) *
          (len - this.gapDegree)}px ${len}px`,
        strokeDashoffset: `-${this.gapDegree / 2}px`,
      };
    },
  },

  render() {
    const showIcon = this.status && this.status !== 'active';
    const info = showIcon ? (
      <span class={this._addPrefix(`icon-${this.status || ''}`)} />
    ) : (
      <span key={1}>{this.percent}%</span>
    );
    const path1Data = {
      class: this._addPrefix('trail'),
      style: this.trailPathStyle,
      attrs: {
        d: this.pathString,
        'stroke-width': this.trailWidth || this.strokeWidth,
        'fill-opacity': '0',
      },
    };
    const path2Data = {
      class: this._addPrefix('stroke'),
      style: this.strokePathStyle,
      attrs: {
        d: this.pathString,
        stroke: this.strokeColor
          ? tinycolor(this.strokeColor).toHexString()
          : '',
        'stroke-linecap': this.strokeLinecap,
        'stroke-width': this.percent === 0 ? 0 : this.strokeWidth,
        'fill-opacity': '0',
      },
    };
    const circleData = {
      class: this.classes,
      on: this.$listeners,
    };

    return (
      <div {...circleData}>
        {this.showInfo ? (
          <span class={this._addPrefix('circle-info')}>{info}</span>
        ) : null}
        <svg
          class={this._addPrefix('svg')}
          viewBox="0 0 100 100"
          {...this.$attrs}
        >
          <path {...path1Data} />
          <path {...path2Data} />
        </svg>
      </div>
    );
  },

  methods: {
    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
