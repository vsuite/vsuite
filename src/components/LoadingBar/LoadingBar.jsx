import VueTypes from 'vue-types';
import tinycolor from 'tinycolor2';
import prefix, { defaultClassPrefix } from 'utils/prefix';

const CLASS_PREFIX = 'loading-bar';
export const STATUS = {
  LOADING: 'active',
  ERROR: 'fail',
};

function validColor(val) {
  return tinycolor(val).isValid();
}

export default {
  name: 'LoadingBar',

  props: {
    color: VueTypes.custom(validColor, '`strokeColor` is not valid'),
    failedColor: VueTypes.custom(validColor, '`strokeColor` is not valid').def,
    height: VueTypes.number,
    progress: VueTypes.bool,
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
  },

  data() {
    return {
      percent: this.progress ? 0 : 100,
      status: STATUS.LOADING,
      show: false,
    };
  },

  computed: {
    classes() {
      return [
        this.classPrefix,
        {
          [this._addPrefix('show')]: this.show,
          [this._addPrefix(`${this.status || ''}`)]: this.status,
        },
      ];
    },

    percentStyle() {
      return {
        width: `${this.percent}%`,
        height: `${this.height}px`,
        backgroundColor: this.color ? tinycolor(this.color).toHexString() : '',
      };
    },
  },

  render() {
    const loadingBarData = {
      class: this.classes,

      attrs: this.$attrs,

      on: this.$listeners,

      directives: [{ name: 'show', value: this.show }],
    };

    return (
      <transition name="fade">
        <div {...loadingBarData}>
          <div class={this._addPrefix('outer')}>
            <div class={this._addPrefix('inner')}>
              <div class={this._addPrefix('bg')} style={this.percentStyle} />
            </div>
          </div>
        </div>
      </transition>
    );
  },

  methods: {
    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
