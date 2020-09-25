import _ from 'lodash';
import { parseStyle } from './node';

export function mergeData(s, t) {
  const result = _.merge({}, s, t);

  // class
  result.class = [s.class, t.class].filter(Boolean);

  // styles
  result.styles = {
    ...parseStyle(s.style),
    ...parseStyle(t.style),
  };

  // attrs
  result.attrs = { ...(s.attrs || {}), ...(t.attrs || {}) };

  // nativeOn
  result.nativeOn = { ...(s.nativeOn || {}) };

  if (t.nativeOn) {
    for (const event in t.nativeOn) {
      if (
        t.nativeOn.hasOwnProperty(event) &&
        result.nativeOn.hasOwnProperty(event)
      ) {
        result.nativeOn[event] = _.over([
          result.nativeOn[event],
          t.nativeOn[event],
        ]);
      } else if (t.nativeOn.hasOwnProperty(event)) {
        result.nativeOn[event] = t.nativeOn[event];
      }
    }
  }

  // on
  result.on = { ...(s.on || {}) };

  if (t.on) {
    for (const event in t.on) {
      if (t.on.hasOwnProperty(event) && result.on.hasOwnProperty(event)) {
        result.on[event] = _.over([result.on[event], t.on[event]]);
      } else if (t.on.hasOwnProperty(event)) {
        result.on[event] = t.on[event];
      }
    }
  }

  // directives
  result.directives = _.uniqBy(
    [...(s.directives || []), ...(t.directives || [])],
    'name'
  );

  return result;
}

export function mergeElement(vnode, data) {
  if (vnode.componentOptions) {
    vnode.componentOptions = {
      ...vnode.componentOptions,
      listeners: {
        ...(_.get(vnode, 'componentOptions.listeners') || {}),
      },
      propsData: {
        ...(_.get(vnode, 'componentOptions.propsData') || {}),
        ...(data.props || {}),
      },
    };

    if (data.on) {
      for (const event in data.on) {
        if (
          data.on.hasOwnProperty(event) &&
          vnode.componentOptions.listeners.hasOwnProperty(event)
        ) {
          vnode.componentOptions.listeners[event] = _.over([
            vnode.componentOptions.listeners[event],
            data.on[event],
          ]);
        } else if (data.on.hasOwnProperty(event)) {
          vnode.componentOptions.listeners[event] = data.on[event];
        }
      }

      delete data.on;
    }
  }

  vnode.data = mergeData(vnode.data, data);

  return vnode;
}
