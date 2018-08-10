/**
 * classNames
 */
import invariant from 'utils/invariant';

export const hasClass = function(target, className) {
  if (target.classList) {
    return !!className && target.classList.contains(className);
  }

  return !!~` ${target.className} `.indexOf(` ${className} `);
};

export const addClass = function(target, className) {
  if (className) {
    if (target.classList) {
      target.classList.add(className);
    } else if (!hasClass(target, className)) {
      target.className = `${target.className} ${className}`;
    }
  }

  return target;
};

export const removeClass = function(target, className) {
  if (className) {
    if (target.classList) {
      target.classList.remove(className);
    } else {
      target.className = target.className
        .replace(new RegExp(`(^|\\s)${className}(?:\\s|$)`, 'g'), '$1')
        .replace(/\s+/g, ' ') // multiple spaces to one
        .replace(/^\s*|\s*$/g, ''); // trim the ends
    }
  }

  return target;
};

export const toggleClass = function(target, className) {
  if (hasClass(target, className)) {
    removeClass(target, className);
  }

  return addClass(target, className);
};

/**
 * style
 */
function getComputedStyle(node) {
  invariant(node, 'No Element passed to `getComputedStyle()`');

  const doc = node.ownerDocument;

  if ('defaultView' in doc) {
    if (doc.defaultView.opener) {
      return node.ownerDocument.defaultView.getComputedStyle(node, null);
    }

    return window.getComputedStyle(node, null);
  }

  return null;
}

function camelizeStyleName(name) {
  return name.replace(/^-/, '').replace(/-(.)/g, (_, c) => c.toUpperCase());
}

function hyphenateStyleName(name) {
  return name
    .replace(/([A-Z])/g, '-$1')
    .toLowerCase()
    .replace(/^ms-/, '-ms-');
}

export const getStyle = function(node, property) {
  if (property) {
    const value = node.style[camelizeStyleName(property)];

    if (value) {
      return value;
    }

    const styles = getComputedStyle(node);

    if (styles) {
      return styles.getPropertyValue(hyphenateStyleName(property));
    }
  }

  return node.style || getComputedStyle(node);
};

export const addStyle = function(node, property, value) {
  let css = '';
  let props = property;

  if (typeof property === 'string') {
    if (value === undefined) {
      invariant('value is undefined');
    }

    props = {};
    props[property] = value;
  }

  if (typeof props === 'object') {
    for (let key in props) {
      if (Object.prototype.hasOwnProperty.call(props, key)) {
        !props[key] && props[key] !== 0
          ? removeStyle(node, hyphenateStyleName(key))
          : (css += `${hyphenateStyleName(key)}:${props[key]};`);
      }
    }
  }

  node.style.cssText += `;${css}`;
};

export const removeStyle = function(node, keys) {
  const rStyle = function(node, key) {
    if ('removeProperty' in node.style) {
      node.style.removeProperty(key);
    } else if (typeof node.style.removeAttribute === 'function') {
      node.style.removeAttribute(key);
    }
  };

  if (typeof keys === 'string') {
    rStyle(node, keys);
  } else if (Object.prototype.toString.call(keys) === '[object Array]') {
    keys.forEach(key => rStyle(node, key));
  }
};

export const getAttr = function(node, property) {
  function getAllAttrs() {
    // Return an empty object if there are no attributes.
    const attrs = {};
    const map = node.attributes;

    if (!(node && node.nodeType === 1)) return {};
    if (map.length === 0) return {};

    for (let i = 0, attr; (attr = map[i]); i++) {
      attrs[attr.name] = attr.value;
    }

    return attrs;
  }

  if (property) {
    // Validate input.
    if (!(node && node.nodeType === 1)) return null;

    return node.getAttribute(property);
  }

  return getAllAttrs();
};

export const setAttr = function(node, property, value) {
  let data = property;

  if (typeof property === 'string') {
    if (typeof value === 'undefined') return;

    data = { [property]: value };
  }

  for (const key in data) {
    node.setAttribute(key, data[key]);
  }
};

export const removeAttr = function(node, property) {
  if (!property) return;

  node.removeAttribute(property);
};

/**
 * events
 */
/* eslint-disable no-unused-vars */
const EVENTS_MAP = {
  UIEvents: 'initUIEvent',
  MouseEvents: 'initMouseEvent',
  MutationEvents: 'initMutationEvent',
  HTMLEvents: 'initEvent',
};

export const on = function(target, eventName, listener, capture = false) {
  if (target.addEventListener) {
    target.addEventListener(eventName, listener, capture);
  } else {
    target.attachEvent(`on${eventName}`, listener);
  }

  return { off: () => off(target, eventName, listener, capture) };
};

export const off = function(target, eventName, listener, capture = false) {
  if (target.removeEventListener) {
    target.removeEventListener(eventName, listener, capture);
  } else {
    target.detachEvent(`on${eventName}`, listener);
  }
};

export const trigger = function(target, eventName) {
  let event;

  if (document.createEvent) {
    event = document.createEvent('HTMLEvents');
    event.initEvent(eventName, true, true);
  } else {
    event = document.createEventObject();
    event.eventType = eventName;
  }

  event.eventName = eventName;

  if (document.createEvent) {
    target.dispatchEvent(event);
  } else {
    target.fireEvent(`on${eventName}`, event);
  }
};

/**
 * query
 */
export const ownerDocument = function(node) {
  return (node && node.ownerDocument) || document;
};

export const ownerWindow = function(node) {
  const doc = ownerDocument(node);

  return doc.defaultView || window;
};

export const getWindow = function(node) {
  if (node === node.window) return node;

  return node.nodeType === 9 ? node.defaultView || node.parentWindow : null;
};

export const getWidth = function(node, client) {
  const win = getWindow(node);

  if (win) {
    return win.innerWidth;
  }

  return client ? node.clientWidth : getOffset(node).width || 0;
};

export const getHeight = function(node, client) {
  const win = getWindow(node);

  if (win) {
    return win.innerHeight;
  }

  return client ? node.clientHeight : getOffset(node).height || 0;
};

export const getOffsetParent = function(node) {
  const doc = ownerDocument(node);
  let offsetParent = node && node.offsetParent;

  while (
    offsetParent &&
    (node.nodeName && node.nodeName.toLowerCase()) !== 'html' &&
    getStyle(offsetParent, 'position') === 'static'
  ) {
    offsetParent = offsetParent.offsetParent;
  }

  return offsetParent || doc.documentElement;
};

export const containsNode = function(context, node) {
  if (window && window.document && window.document.createElement) {
    if (context.contains) {
      return context.contains(node);
    } else if (context.compareDocumentPosition) {
      return context === node || !!(context.compareDocumentPosition(node) & 16);
    }
  }

  if (node) {
    do {
      if (node === context) {
        return true;
      }
    } while ((node = node.parentNode));
  }

  return false;
};

export const getOffset = function(node) {
  const doc = ownerDocument(node);
  const win = getWindow(node);
  const docElem = doc && doc.documentElement;

  let box = {
    top: 0,
    left: 0,
    height: 0,
    width: 0,
  };

  if (!doc) return null;

  if (!containsNode(docElem, node)) {
    return box;
  }

  if (node.getBoundingClientRect) {
    box = node.getBoundingClientRect();
  }

  if ((box.width || box.height) && docElem && win) {
    box = {
      top:
        box.top +
        (win.pageYOffset || docElem.scrollTop) -
        (docElem.clientTop || 0),
      left:
        box.left +
        (win.pageXOffset || docElem.scrollLeft) -
        (docElem.clientLeft || 0),
      width: (box.width === null ? node.offsetWidth : box.width) || 0,
      height: (box.height === null ? node.offsetHeight : box.height) || 0,
    };
  }

  return box;
};

export const getPosition = function(node, offsetParent) {
  const parentOffset = {
    top: 0,
    left: 0,
  };
  let offset = null;

  // Fixed elements are offset from window (parentOffset = {top:0, left: 0},
  // because it is its only offset parent
  if (getStyle(node, 'position') === 'fixed') {
    offset = node.getBoundingClientRect();
  } else {
    offsetParent = offsetParent || getOffsetParent(node);
    offset = getOffset(node);

    if (
      (offsetParent.nodeName && offsetParent.nodeName.toLowerCase()) !== 'html'
    ) {
      const nextParentOffset = getOffset(offsetParent);
      if (nextParentOffset) {
        parentOffset.top = nextParentOffset.top;
        parentOffset.left = nextParentOffset.left;
      }
    }

    parentOffset.top +=
      parseInt(getStyle(offsetParent, 'borderTopWidth'), 10) -
        scrollTop(offsetParent) || 0;
    parentOffset.left +=
      parseInt(getStyle(offsetParent, 'borderLeftWidth'), 10) -
        scrollLeft(offsetParent) || 0;
  }

  // Subtract parent offsets and node margins

  if (offset) {
    return {
      ...offset,
      top:
        offset.top -
        parentOffset.top -
        (parseInt(getStyle(node, 'marginTop'), 10) || 0),
      left:
        offset.left -
        parentOffset.left -
        (parseInt(getStyle(node, 'marginLeft'), 10) || 0),
    };
  }

  return null;
};

let size;

export const getScrollbarSize = function(recalc) {
  if (size === undefined || recalc) {
    if (window && window.document && window.document.createElement) {
      const scrollDiv = document.createElement('div');
      const body = document.body;

      scrollDiv.style.position = 'absolute';
      scrollDiv.style.top = '-9999px';
      scrollDiv.style.width = '50px';
      scrollDiv.style.height = '50px';
      scrollDiv.style.overflow = 'scroll';

      body.appendChild(scrollDiv);
      size = scrollDiv.offsetWidth - scrollDiv.clientWidth;
      body.removeChild(scrollDiv);
    }
  }

  return size;
};

export const scrollLeft = function(node, val) {
  const win = getWindow(node);
  let left = node.scrollLeft;
  let top = 0;

  if (win) {
    left =
      'pageXOffset' in win
        ? win.pageXOffset
        : win.document.documentElement.scrollLeft;
    top =
      'pageYOffset' in win
        ? win.pageYOffset
        : win.document.documentElement.scrollTop;
  }

  if (val !== undefined) {
    if (win) {
      win.scrollTo(val, top);
    } else {
      node.scrollLeft = val;
    }
  }

  return left;
};

export const scrollTop = function(node, val) {
  const win = getWindow(node);
  let top = node.scrollTop;
  let left = 0;

  if (win) {
    top =
      'pageYOffset' in win
        ? win.pageYOffset
        : win.document.documentElement.scrollTop;
    left =
      'pageXOffset' in win
        ? win.pageXOffset
        : win.document.documentElement.scrollLeft;
  }

  if (val !== undefined) {
    if (win) {
      win.scrollTo(left, val);
    } else {
      node.scrollTop = val;
    }
  }

  return top;
};

export const isOverflowing = function(container) {
  let win = getWindow(container);
  let isBody = container && container.tagName.toLowerCase() === 'body';

  if (win || isBody) {
    let doc = ownerDocument(container);
    let win = getWindow(doc);
    let fullWidth = win.innerWidth;

    if (doc.body) {
      return doc.body.clientWidth < fullWidth;
    }

    return false;
  }

  return container.scrollHeight > container.clientHeight;
};
