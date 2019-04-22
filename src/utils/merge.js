import _ from 'lodash';
import { parseStyle } from './node';

export default function mergeData(s, t) {
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
