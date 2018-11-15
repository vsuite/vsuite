import _ from 'lodash';
import invariant from 'utils/invariant';

import {
  CELL_MINI_WIDTH,
  CELL_ALIGN,
  CELL_FIXED,
  CELL_TYPE,
} from '../constants';

function travelColumn(column, func) {
  const children = (column && column.children) || [];

  if (children.length <= 0) {
    func && func(column);

    return column;
  }

  children.forEach(col => travelColumn(col, func));
  func && func(column);

  return column;
}

// deal with title property
function title(col, index) {
  invariant.not(
    col.title === null || col.title === undefined,
    `[Table] COLUMN ${index}: \`title\` is required`
  );
}

// deal with key property
function key(col) {
  col.key = col.key || null;
}

// deal with width, minWidth and maxWidth property
function width(col, index, children) {
  invariant.not(
    _.isNumber(col.width) && col.width <= 0,
    `[Table] COLUMN ${index}: \`width\` cannot smaller than zero`
  );

  invariant.not(
    _.isNumber(col.minWidth) && col.minWidth <= 0,
    `[Table] COLUMN ${index}: \`minWidth\` cannot smaller than zero`
  );

  invariant.not(
    _.isNumber(col.maxWidth) && col.maxWidth <= 0,
    `[Table] COLUMN ${index}: \`maxWidth\` cannot smaller than zero`
  );

  const hasChildren = children.length > 0;
  const isPerfect = hasChildren && children.every(c => !!c.width);
  const totalW = children.reduce((p, v) => p + (v.width || 0), 0);

  // width
  col.width = isPerfect ? totalW : col.width || null;

  // min-width
  col.minWidth = isPerfect
    ? totalW
    : hasChildren
    ? Math.max(
        children.reduce(
          (p, v) => p + (v.minWidth || v.width || CELL_MINI_WIDTH),
          0
        ),
        col.minWidth || col.width || CELL_MINI_WIDTH
      )
    : col.minWidth || col.width || CELL_MINI_WIDTH;

  // max-width
  col.maxWidth = isPerfect
    ? totalW
    : hasChildren
    ? Math.min(
        children.reduce((p, v) => p + (v.maxWidth || v.width || Infinity), 0),
        col.maxWidth || col.width || Infinity
      )
    : col.maxWidth || col.width || Infinity;

  invariant.not(
    col.maxWidth < col.minWidth,
    `[Table] COLUMN ${index}: \`maxWidth\` cannot smaller than \`minWidth\``
  );

  if (col.minWidth === col.maxWidth) {
    col.width = col.minWidth;

    return;
  }

  invariant(
    !_.isNumber(col.width) ||
      (_.isNumber(col.width) &&
        col.width >= col.minWidth &&
        col.width <= col.maxWidth),
    `[Table] COLUMN ${index}: \`width\` must bigger than \`minWidth\` and smaller than \`maxWidth\``
  );
}

// text style
function text(col, index, children) {
  invariant.not(
    col.align && _.isUndefined(CELL_ALIGN[col.align]),
    `[Table] COLUMN ${index}: \`align\` = ${col.align} is not supported`
  );

  invariant.not(
    col.fixed && _.isUndefined(CELL_FIXED[col.fixed]),
    `[Table] COLUMN ${index}: \`fixed\` = ${col.fixed} is not supported`
  );

  invariant.not(
    children.length && children.some(x => !_.isUndefined(CELL_FIXED[x.fixed])),
    `[Table] COLUMN ${index}: \`fixed\` cannot be set for children`
  );

  invariant.not(
    col.type && _.isUndefined(CELL_TYPE[col.type]),
    `[Table] COLUMN ${index}: \`type\` = ${col.type} is not supported`
  );

  col.className = col.className || '';
  col.style = col.style || {};
  col.type = col.type || null;
  col.align = col.align || CELL_ALIGN.LEFT;
  col.fixed = col.fixed || false;
  col.ellipsis = col.ellipsis || false;
  col.tooltip = col.tooltip || false;
}

// sort
function sort() {}

// filter
function filter() {}

// resize
function resize(col, index, children) {
  // TODO: Support resizable in children column
  invariant.not(
    children.length > 0 && children.some(x => x.resizable),
    `[Table] COLUMN ${index}: \`resizable\` cannot set to children`
  );

  invariant.not(
    col.width && col.resizable,
    `[Table] COLUMN ${index}: \`resizable\` cannot work with \`width\` property. You can use \`minWidth\` instead.`
  );

  col.resizable = col.resizable || false;
}

// flex
function flex() {}

function formatColumns(columns = []) {
  return _.cloneDeep(columns).map((column, index) => {
    return travelColumn(column, col => {
      const children = (col && col.children) || [];

      // title
      title(col, index, children);

      // key
      key(col, index, children);

      // width
      width(col, index, children);

      // text
      text(col, index, children);

      // sort
      sort(col, index, children);

      // filter
      filter(col, index, children);

      // resize
      resize(col, index, children);

      // flex
      flex(col, index, children);

      // resizable
      // col.resizable = col.resizable || false;

      // sortable
      // col.sortable = col.sortable || false;

      // flex
      // col.flex =
      //   children.reduce((p, v) => p + (v.flex || 0), 0) || col.flex || 0;
    });
  });
}

export default formatColumns;
