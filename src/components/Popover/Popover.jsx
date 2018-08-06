import VueTypes from 'vue-types';
import Popper from 'popper.js';

export default {
  name: 'Popover',

  props: {
    trigger: VueTypes.oneOf(['click', 'hover', 'focus', 'active']).def('click'),
    placement: VueTypes.oneOf(Popper.placements).def('auto'),
    positionFixed: VueTypes.bool.def(false),
    eventsEnabled: VueTypes.bool,
    removeOnDestroy: VueTypes.bool.def(false),

    // modifiers
    shift: VueTypes.shape({
      order: VueTypes.number,
      enabled: VueTypes.bool,
    }).loose.def({ order: 100, enabled: true }),
    offset: VueTypes.shape({
      order: VueTypes.number,
      enabled: VueTypes.bool,
      offset: VueTypes.oneOfType([VueTypes.string, VueTypes.number]),
    }).loose.def({
      order: 200,
      enabled: true,
      offset: 0,
    }),
    preventOverflow: VueTypes.shape({
      order: VueTypes.number,
      enabled: VueTypes.bool,
      priority: VueTypes.array,
      padding: VueTypes.number,
      boundariesElement: VueTypes.oneOfType([
        VueTypes.oneOf(['scrollParent', 'window', 'viewport']),
        VueTypes.object,
      ]),
    }).loose.def({
      order: 300,
      enabled: true,
      priority: ['left', 'right', 'top', 'bottom'],
      padding: 5,
      boundariesElement: 'scrollParent',
    }),
    keepTogether: VueTypes.shape({
      order: VueTypes.number,
      enabled: VueTypes.bool,
    }).loose.def({ order: 400, enabled: true }),
    arrow: VueTypes.shape({
      order: VueTypes.number,
      enabled: VueTypes.bool,
      element: VueTypes.oneOfType([VueTypes.string, VueTypes.object]),
    }).loose.def({
      order: 500,
      enabled: true,
      element: '[x-arrow]',
    }),
    flip: VueTypes.shape({
      order: VueTypes.number,
      enabled: VueTypes.bool,
      behavior: VueTypes.oneOfType([
        VueTypes.oneOf(['flip', 'clockwise', 'counterclockwise']),
        VueTypes.array,
      ]),
      padding: VueTypes.number,
      boundariesElement: VueTypes.oneOfType([
        VueTypes.oneOf(['scrollParent', 'window', 'viewport']),
        VueTypes.object,
      ]),
    }).loose.def({
      order: 600,
      enabled: true,
      behavior: 'flip',
      padding: 5,
      boundariesElement: 'viewport',
    }),
    inner: VueTypes.shape({
      order: VueTypes.number,
      enabled: VueTypes.bool,
    }).loose.def({ order: 700, enabled: false }),
    hide: VueTypes.shape({
      order: VueTypes.number,
      enabled: VueTypes.bool,
    }).loose.def({ order: 800, enabled: true }),
    computeStyle: VueTypes.shape({
      order: VueTypes.number,
      enabled: VueTypes.bool,
      gpuAcceleration: VueTypes.bool,
      // prettier-ignore
      x: VueTypes.oneOf(['\'bottom\'', '\'top\'']),
      // prettier-ignore
      y: VueTypes.oneOf(['\'left\'', '\'right\''])
    }).loose.def({
      order: 850,
      enabled: true,
      gpuAcceleration: true,
      // prettier-ignore
      x: '\'bottom\'',
      // prettier-ignore
      y: '\'left\''
    }),
    applyStyle: VueTypes.shape({
      order: VueTypes.number,
      enabled: VueTypes.bool,
      onLoad: VueTypes.func,
    }).loose.def({ order: 900, enabled: true }),
  },

  data() {
    return {
      vVisible: false,
    };
  },

  render() {
    return null;
  },
};
