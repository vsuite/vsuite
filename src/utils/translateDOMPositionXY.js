import { isSafari } from 'shares/browser';

import getVendorPrefixedName from './getVendorPrefixedName';

const TRANSFORM = getVendorPrefixedName('transform');
const BACKFACE_VISIBILITY = getVendorPrefixedName('backfaceVisibility');

const translateDOMPositionXY = (() => {
  if (getVendorPrefixedName('transform')) {
    // It appears that Safari messes up the composition order
    // of GPU-accelerated layers
    // (see bug https://bugs.webkit.org/show_bug.cgi?id=61824).
    // Use 2D translation instead.
    if (!isSafari && getVendorPrefixedName('perspective')) {
      return (style, x = 0, y = 0) => {
        style[TRANSFORM] = `translate3d(${x}px,${y}px,0)`;
        style[BACKFACE_VISIBILITY] = 'hidden';

        return style;
      };
    }

    return (style, x = 0, y = 0) => {
      style[TRANSFORM] = `translate(${x}px,${y}px)`;

      return style;
    };
  }

  return (style, x = 0, y = 0) => {
    style.left = `${x}px`;
    style.top = `${y}px`;

    return style;
  };
})();

export default translateDOMPositionXY;
