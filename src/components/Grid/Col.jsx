import VueTypes from 'vue-types';
import _ from 'lodash';
import prefix, { defaultClassPrefix } from 'utils/prefix';

const CLASS_PREFIX = 'col';
const Sizes = ['xs', 'sm', 'md', 'lg'];
const getValue = _.curry((obj, key) => obj[key]);

export default {
  name: 'Col',

  props: {
    xs: VueTypes.number,
    sm: VueTypes.number,
    md: VueTypes.number,
    lg: VueTypes.number,

    xsOffset: VueTypes.number,
    smOffset: VueTypes.number,
    mdOffset: VueTypes.number,
    lgOffset: VueTypes.number,

    xsPush: VueTypes.number,
    smPush: VueTypes.number,
    mdPush: VueTypes.number,
    lgPush: VueTypes.number,
    xsPull: VueTypes.number,
    smPull: VueTypes.number,
    mdPull: VueTypes.number,
    lgPull: VueTypes.number,

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

    const colData = {
      class: classes,
      attrs: this.$attrs,
      on: this.$listeners,
    };

    return <Component {...colData}>{this.$slots.default}</Component>;
  },

  methods: {
    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
