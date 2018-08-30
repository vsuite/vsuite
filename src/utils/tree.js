import _ from 'lodash';

function findNode(nodes, checker) {
  const find = (nodes = []) => {
    for (let i = 0, len = nodes.length; i < len; i++) {
      const item = nodes[i];

      if (_.isArray(item.children)) {
        const node = find(item.children);

        if (node) return node;
      }

      if (checker(item)) return item;
    }

    return undefined;
  };

  return find(nodes);
}

function filterNodes(nodes, checker) {
  const find = (nodes = []) => {
    return nodes.filter(item => {
      if (_.isArray(item.children)) {
        const nextChildren = find(item.children);

        if (nextChildren.length) {
          item.children = nextChildren;

          return true;
        }
      }

      return checker(item);
    });
  };

  return find(_.cloneDeep(nodes));
}

export { filterNodes, findNode };
