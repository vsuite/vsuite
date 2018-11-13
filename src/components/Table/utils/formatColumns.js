import _ from 'lodash';
import invariant from 'utils/invariant';

import { CELL_MINI_WIDTH } from '../constants';

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

// deal with width property
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

      // align
      // col.align = col.align || 'left';

      // fixed
      // col.fixed = children.some(c => !!c.fixed) || col.fixed || false;

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
