import _ from 'lodash';

function findNode(nodes, checker, childrenKey = 'children') {
  const find = (nodes = []) => {
    for (let i = 0, len = nodes.length; i < len; i++) {
      const item = nodes[i];

      if (_.isArray(_.get(item, childrenKey))) {
        const node = find(_.get(item, childrenKey));

        if (node) return node;
      }

      if (checker(item)) return item;
    }

    return undefined;
  };

  return find(nodes);
}

function filterNodes(nodes, checker, childrenKey = 'children') {
  const find = (nodes = []) => {
    return nodes.filter(item => {
      if (_.isArray(_.get(item, childrenKey))) {
        const nextChildren = find(_.get(item, childrenKey));

        if (nextChildren.length) {
          _.set(item, childrenKey, nextChildren);

          return true;
        }
      }

      return checker(item);
    });
  };

  return find(_.cloneDeep(nodes));
}

export { filterNodes, findNode };
