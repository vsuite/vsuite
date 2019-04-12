// Thanks to: https://github.com/airyland/vux/blob/v2/src/directives/transfer-dom/index.js
// Thanks to: https://github.com/calebroseland/vue-dom-portal

/**
 * Get target DOM Node
 * @param {(Node|string|Boolean)} [node=document.body] DOM Node, CSS selector, or Boolean
 * @return {Node} The target that the el will be appended to
 */
function getTarget(node) {
  if (node === true || !node) {
    return document.body;
  }

  return node instanceof window.Node ? node : document.querySelector(node);
}

const directive = {
  inserted(el, { value }) {
    el.className = el.className
      ? el.className + ' v-transfer-dom'
      : 'v-transfer-dom';

    const parentNode = el.parentNode;

    if (!parentNode) return;

    const home = document.createComment('');
    const transfer = el.dataset && el.dataset.transfer === 'true';
    let hasMovedOut = false;

    if (transfer && value !== false) {
      parentNode && parentNode.replaceChild(home, el); // moving out, el is no longer in the document
      getTarget(value).appendChild(el); // moving into new place
      hasMovedOut = true;
    }

    if (!el.__transferDomData) {
      el.__transferDomData = {
        parentNode: parentNode,
        home: home,
        target: getTarget(value),
        hasMovedOut: hasMovedOut,
      };
    }
  },

  componentUpdated(el, { value }) {
    const ref$1 = el.__transferDomData;

    if (!ref$1) return;

    const transfer = el.dataset && el.dataset.transfer === 'true';
    const parentNode = ref$1.parentNode;
    const home = ref$1.home;
    const hasMovedOut = ref$1.hasMovedOut; // recall where home is
    const target = ref$1.target;

    // move out
    if (!hasMovedOut && transfer && value !== false) {
      parentNode && parentNode.replaceChild(home, el);
      getTarget(value).appendChild(el);
      el.__transferDomData = Object.assign({}, el.__transferDomData, {
        hasMovedOut: true,
        target: getTarget(value),
      });

      return;
    }

    // reset
    if (hasMovedOut && !transfer && value !== false) {
      target && target.removeChild(el);
      parentNode && parentNode.replaceChild(el, home);
      el.__transferDomData = Object.assign({}, el.__transferDomData, {
        hasMovedOut: false,
        target: getTarget(value),
      });
    }
  },

  unbind(el) {
    el.className = el.className.replace('v-transfer-dom', '');

    const ref$1 = el.__transferDomData;

    if (!ref$1) return;

    const parentNode = ref$1.parentNode;
    const hasMovedOut = ref$1.hasMovedOut;
    const target = ref$1.target;

    if (hasMovedOut === true) {
      target && target.removeChild(el);
      parentNode && parentNode.appendChild(el);
    }

    el.__transferDomData = null;
  },
};

export default directive;
