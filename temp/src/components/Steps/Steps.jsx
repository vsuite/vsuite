import VueTypes from 'vue-types';
import prefix, { defaultClassPrefix } from 'utils/prefix';
import invariant from 'utils/invariant';
import { getName, getProps, cloneElement } from 'utils/node';
import { isIE10 } from 'utils/BrowserDetection';

import STATUS from './status';

const CLASS_PREFIX = 'steps';

export default {
  name: 'Steps',

  props: {
    current: VueTypes.number,
    currentStatus: VueTypes.oneOf([
      STATUS.WAIT,
      STATUS.PROCESS,
      STATUS.FINISH,
      STATUS.ERROR,
    ]).def(STATUS.PROCESS),
    vertical: VueTypes.bool.def(false),
    small: VueTypes.bool.def(false),

    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),

    // slot
  },

  computed: {
    classes() {
      return [
        this.classPrefix,
        {
          [this._addPrefix('small')]: this.small,
          [this._addPrefix('vertical')]: this.vertical,
          [this._addPrefix('horizontal')]: !this.vertical,
        },
      ];
    },
  },

  render() {
    const children = this.$slots.default || [];
    const count = children.length;
    const items = children.map((vnode, index) => {
      const name = getName(vnode);
      const data = {};
      const props = getProps(vnode);

      // prettier-ignore
      invariant.not(name && name !== 'StepItem', '<Steps>\'s children must be <StepItem>');

      data.props = {
        stepNumber: index + 1,
        status: STATUS.WAIT,
        ...props,
      };

      if (!this.vertical) {
        data.style = {
          [isIE10() ? 'msFlexPreferredSize' : 'flexBasis']:
            index < count - 1 ? `${100 / (count - 1)}%` : undefined,
          maxWidth: index === count - 1 ? `${100 / count}%` : undefined,
        };
      }

      // fix tail color
      if (this.currentStatus === STATUS.ERROR && index === this.current - 1) {
        data.class = this._addPrefix('next-error');
      }

      if (!props.status) {
        if (index === this.current) {
          data.props.status = this.currentStatus;
        } else if (index < this.current) {
          data.props.status = STATUS.FINISH;
        }
      }

      return cloneElement(vnode, data);
    });
    const stepsData = {
      class: this.classes,
      attrs: this.$attrs,
      on: this.$listeners,
    };

    return <div {...stepsData}>{items}</div>;
  },

  methods: {
    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
