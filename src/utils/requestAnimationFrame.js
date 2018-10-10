import emptyFunction from 'utils/emptyFunction';

const nativeRequestAnimationFrame =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame;

let lastTime = 0;

/**
 * Here is the native and polyfill version of requestAnimationFrame.
 * Please don't use it directly and use requestAnimationFrame module instead.
 */
const requestAnimationFrame =
  (nativeRequestAnimationFrame && nativeRequestAnimationFrame.bind(global)) ||
  (callback => {
    const currTime = Date.now();
    const timeDelay = Math.max(0, 16 - (currTime - lastTime));

    lastTime = currTime + timeDelay;

    return global.setTimeout(() => callback(Date.now()), timeDelay);
  });

// Works around a rare bug in Safari 6 where the first request is never invoked.
requestAnimationFrame(emptyFunction);

export default requestAnimationFrame;
