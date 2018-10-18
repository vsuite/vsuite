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

function formatColumns(columns = []) {
  return columns.map((column, index) => {
    return travelColumn(column, col => {
      // const children = (column && column.children) || [];
      //
      // // width
      // col.width = children.map(child =)
    });
  });
}

export default formatColumns;
