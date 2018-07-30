import VueTypes from 'vue-types';
import tinycolor from 'tinycolor2';
import prefix, { defaultClassPrefix } from 'utils/prefix';

const CLASS_PREFIX = 'progress';

function validColor(val) {
  return tinycolor(val).isValid();
}

export default {
  name: 'ProgressLine',

  props: {
    percent: VueTypes.number,
    strokeWidth: VueTypes.number.def(10),
    strokeColor: VueTypes.custom(validColor, '`strokeColor` is not valid'),
    showInfo: VueTypes.bool,
    status: VueTypes.oneOf(['success', 'fail', 'active']),
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
  },

  computed: {
    classes() {
      return [
        this.classPrefix,
        this._addPrefix('line'),
        {
          [this._addPrefix(`line-${this.status || ''}`)]: this.status,
        },
      ];
    },

    percentStyle() {
      return {
        width: `${this.percent}%`,
        height: `${this.strokeWidth}px`,
        backgroundColor: this.strokeColor
          ? tinycolor(this.strokeColor).toHexString()
          : '',
      };
    },
  },

  render() {
    const showIcon = this.status && this.status !== 'active';
    const info = showIcon ? (
      <span class={this._addPrefix(`icon-${this.status || ''}`)} />
    ) : (
      <span class={this._addPrefix('info-status')}>{this.percent}%</span>
    );

    return (
      <div class={this.classes} {...this.$attrs} {...{ on: this.$listeners }}>
        <div class={this._addPrefix('line-outer')}>
          <div class={this._addPrefix('line-inner')}>
            <div class={this._addPrefix('line-bg')} style={this.percentStyle} />
          </div>
        </div>
        {this.showInfo ? (
          <div class={this._addPrefix('info')}>{info}</div>
        ) : null}
      </div>
    );
  },

  methods: {
    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
