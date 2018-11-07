import _ from 'lodash';
import invariant from 'utils/invariant';

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

function formatColumns(columns = []) {
  return _.cloneDeep(columns).map((column, index) => {
    return travelColumn(column, col => {
      const children = (col && col.children) || [];

      // title
      title(col, index, children);

      // width
      col.width =
        children.reduce((p, v) => p + (v.width || 0), 0) || col.width || 0;

      // minWidth
      col.minWidth =
        children.reduce((p, v) => p + (v.minWidth || 0), 0) ||
        col.minWidth ||
        0;

      // align
      col.align = col.align || 'left';

      // fixed
      col.fixed = children.some(c => !!c.fixed) || col.fixed || false;

      // resizable
      col.resizable = col.resizable || false;

      // sortable
      col.sortable = col.sortable || false;

      // flex
      col.flex =
        children.reduce((p, v) => p + (v.flex || 0), 0) || col.flex || 0;
    });
  });
}

export default formatColumns;
