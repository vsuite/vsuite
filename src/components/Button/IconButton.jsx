import VueTypes from 'vue-types';
import prefix, { defaultClassPrefix } from 'utils/prefix';
import invariant from 'utils/invariant';

import Button from './Button.jsx';
import Icon from '../Icon/Icon.jsx';

const CLASS_PREFIX = 'btn-icon';

export default {
  name: 'IconButton',

  props: {
    icon: VueTypes.oneOfType([
      VueTypes.string,
      VueTypes.shape({ viewBox: VueTypes.string, id: VueTypes.string }),
    ]).loose,
    circle: VueTypes.bool.def(false),
    placement: VueTypes.oneOf(['left', 'right']).def('left'),

    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),

    // slot
    // slot-icon
  },

  computed: {
    classes() {
      return [
        this.classPrefix,
        this._addPrefix(`placement-${this.placement}`),
        {
          [this._addPrefix('circle')]: this.circle,
          [this._addPrefix('with-text')]: this.$slots.default,
        },
      ];
    },
  },

  render() {
    invariant.not(
      this.icon && this.$slots.icon,
      'You cannot use property icon and slot icon at same time. Please pick one way.'
    );

    const iconBtnData = {
      class: this.classes,
      props: this.$attrs,
      on: this.$listeners,
    };

    return (
      <Button {...iconBtnData}>
        {this.icon && <Icon icon={this.icon} />}
        {this.$slots.icon}
        {this.$slots.default}
      </Button>
    );
  },

  methods: {
    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
