import _ from 'lodash';

function camelize(str) {
  return str.replace(/-(\w)/g, (_, c) => (c ? c.toUpperCase() : ''));
}

function filterEmpty(children) {
  return (children || [[]]).filter(
    child => child.tag || (child.text && child.text.trim() !== '')
  );
}

function parseStyleText(cssText = '', camel = true) {
  const res = {};
  const listDelimiter = /;(?![^(]*\))/g;
  const propertyDelimiter = /:(.+)/;

  cssText.split(listDelimiter).forEach(item => {
    if (item) {
      const tmp = item.split(propertyDelimiter);
      if (tmp.length > 1) {
        const k = camel ? camelize(tmp[0].trim()) : tmp[0].trim();
        res[k] = tmp[1].trim();
      }
    }
  });

  return res;
}

function getName(vnode) {
  return (
    vnode.componentOptions &&
    vnode.componentOptions.Ctor &&
    vnode.componentOptions.Ctor.extendOptions &&
    vnode.componentOptions.Ctor.extendOptions.name
  );
}

function getClasses(vnode) {
  const data = vnode.data || {};

  const cls = data.class || data.staticClass;
  const result = cls;

  if (typeof cls === 'string') {
    cls
      .split(' ')
      .filter(x => !!x)
      .forEach(c => (result[c.trim()] = true));
  }

  return result;
}

function getStyles(vnode, camel = true) {
  const data = vnode.data || {};

  let style = data.style || data.staticStyle;

  if (typeof styl === 'string') {
    style = parseStyleText(style, camel);
  } else if (camel && style) {
    const res = {};

    Object.keys(style).forEach(k => (res[camelize(k)] = style[k]));

    return res;
  }

  return style;
}

function getProps(vnode) {
  const data = vnode.data || {};
  const componentOptions = vnode.componentOptions || {};

  return { ...(data.props || {}), ...(componentOptions.propsData || {}) };
}

function getAttrs(vnode) {
  const data = vnode.data || {};

  return { ...(data.attrs || {}) };
}

function getKey(vnode) {
  return vnode.key;
}

function getEvents(vnode) {
  const data = vnode.data || {};
  const componentOptions = vnode.componentOptions || {};

  if (componentOptions.listeners) {
    return { ...componentOptions.listeners };
  }

  return { ...data.on };
}

function cloneVNode(vnode, deep) {
  const cloned = new vnode.constructor(
    vnode.tag,
    vnode.data,
    vnode.children,
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );

  cloned.key = vnode.key;
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.isComment = vnode.isComment;
  cloned.isCloned = true;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;

  if (deep) {
    if (vnode.children) {
      cloned.children = cloneVNodes(vnode.children, true);
    }

    if (vnode.componentOptions && vnode.componentOptions.children) {
      cloned.componentOptions.children = cloneVNodes(
        vnode.componentOptions.children,
        true
      );
    }
  }

  return cloned;
}

function cloneVNodes(vnodes, deep) {
  const len = vnodes.length;
  const res = new Array(len);

  for (let i = 0; i < len; i++) {
    res[i] = cloneVNode(vnodes[i], deep);
  }

  return res;
}

function cloneElement(vnode, data, deep) {
  data = data || {};

  if (_.isArray(vnode)) {
    vnode = filterEmpty(vnode)[0];
  }

  if (!vnode) return null;

  const cloned = cloneVNode(vnode, deep);
  const mergeCls = (cls1, cls2) => {
    if (!_.isArray(cls1)) {
      cls1 = [cls1];
    }

    if (!_.isArray(cls2)) {
      cls2 = [cls2];
    }

    return [...cls1, ...cls2];
  };
  const mergeStyles = (styles1, styles2) => {
    if (typeof styles1 === 'string') {
      styles1 = parseStyleText(styles1);
    }

    if (typeof styles2 === 'string') {
      styles2 = parseStyleText(styles2);
    }

    return { ...styles1, ...styles2 };
  };

  cloned.data = {
    ...cloned.data,
    ...data,
    class: mergeCls(cloned.data.class || [], data.class || []),
    style: mergeStyles(cloned.data.style || {}, data.style || {}),
    attrs: {
      ...(cloned.data.attrs || {}),
      ...(data.attrs || {}),
    },
    domProps: {
      ...(cloned.data.domProps || {}),
      ...(data.domProps || {}),
    },
    nativeOn: {
      ...(cloned.data.nativeOn || {}),
      ...(data.nativeOn || {}),
    },
    directives: [...(cloned.data.directives || []), ...(data.directives || [])],
    scopedSlots: {
      ...(cloned.data.scopedSlots || {}),
      ...(data.scopedSlots || {}),
    },
    slot: data.slot || cloned.data.slot,
    key: data.key || cloned.data.key,
    ref: data.ref || cloned.data.ref,
  };

  if (cloned.componentOptions) {
    cloned.componentOptions = {
      ...cloned.componentOptions,
      listeners: {
        ...(cloned.componentOptions.listeners || {}),
        ...(data.on || {}),
      },
      propsData: {
        ...(cloned.componentOptions.propsData || {}),
        ...(data.props || {}),
      },
    };
  } else {
    cloned.data.on = { ...(vnode.data.on || {}), ...(data.on || {}) };
  }

  if (data.key) {
    cloned.key = data.key;
  }

  return cloned;
}

export {
  getName,
  getClasses,
  getStyles,
  getProps,
  getAttrs,
  getEvents,
  getKey,
  cloneElement,
  cloneVNode,
  cloneVNodes,
  filterEmpty,
  parseStyleText,
};
