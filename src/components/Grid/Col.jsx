import VueTypes from 'vue-types';
import _ from 'lodash';
import prefix, { defaultClassPrefix } from 'utils/prefix';
import { splitDataByComponent } from 'utils/split';

const CLASS_PREFIX = 'col';
const Sizes = ['xs', 'sm', 'md', 'lg'];
const getValue = _.curry((obj, key) => obj[key]);

export default {
  name: 'Col',

  props: {
    xs: {
      type: Number,
      default: undefined,
    },
    sm: {
      type: Number,
      default: undefined,
    },
    md: {
      type: Number,
      default: undefined,
    },
    lg: {
      type: Number,
      default: undefined,
    },

    xsOffset: {
      type: Number,
      default: undefined,
    },
    smOffset: {
      type: Number,
      default: undefined,
    },
    mdOffset: {
      type: Number,
      default: undefined,
    },
    lgOffset: {
      type: Number,
      default: undefined,
    },

    xsPush: {
      type: Number,
      default: undefined,
    },
    smPush: {
      type: Number,
      default: undefined,
    },
    mdPush: {
      type: Number,
      default: undefined,
    },
    lgPush: {
      type: Number,
      default: undefined,
    },
    xsPull: {
      type: Number,
      default: undefined,
    },
    smPull: {
      type: Number,
      default: undefined,
    },
    mdPull: {
      type: Number,
      default: undefined,
    },
    lgPull: {
      type: Number,
      default: undefined,
    },

    xsHidden: VueTypes.bool.def(false),
    smHidden: VueTypes.bool.def(false),
    mdHidden: VueTypes.bool.def(false),
    lgHidden: VueTypes.bool.def(false),

    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
    componentClass: VueTypes.oneOfType([VueTypes.string, VueTypes.object]).def(
      'div'
    ),
  },

  render() {
    const Component = this.componentClass;
    const classes = {};
    const getPropValue = getValue(this);

    Sizes.forEach(size => {
      const col = getPropValue(size);
      const hidden = getPropValue(`${size}Hidden`);
      const offset = getPropValue(`${size}Offset`);
      const push = getPropValue(`${size}Push`);
      const pull = getPropValue(`${size}Pull`);

      classes[this._addPrefix(`hidden-${size}`)] = hidden;
      classes[this._addPrefix(`${size}-${col}`)] = col >= 0;
      classes[this._addPrefix(`${size}-offset-${offset}`)] = offset >= 0;
      classes[this._addPrefix(`${size}-push-${push}`)] = push >= 0;
      classes[this._addPrefix(`${size}-pull-${pull}`)] = pull >= 0;
    });

    const colData = splitDataByComponent(
      {
        class: classes,
        splitProps: this.$attrs,
        on: this.$listeners,
      },
      Component
    );

    return <Component {...colData}>{this.$slots.default}</Component>;
  },

  methods: {
    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
