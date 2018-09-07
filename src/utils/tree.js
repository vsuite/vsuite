import _ from 'lodash';
import emptyFunction from 'utils/emptyFunction';

function eachNode(
  nodes,
  func = emptyFunction,
  leaf = true,
  childrenKey = 'children'
) {
  const each = (nodes = []) => {
    nodes.forEach(node => {
      const children = _.get(node, childrenKey);

      if (leaf && children) {
        return each(children);
      }

      if (children) {
        each(children);
      }

      func(node);
    });
  };

  each(nodes);
}

function flattenNodes(nodes, leaf = true, childrenKey = 'children') {
  const list = [];
  const flatten = (nodes = []) => {
    nodes.forEach(node => {
      const children = _.get(node, childrenKey);

      if (!children) list.push(node);
      if (children && !leaf) list.push(node);
      if (children) flatten(children);
    });
  };

  flatten(nodes);

  return list;
}

function mapNode(
  nodes,
  func = emptyFunction.thatReturnsArgument,
  childrenKey = 'children'
) {
  const map = (nodes = [], layer = 0) => {
    return nodes.map((node, index) => {
      let children = _.get(node, childrenKey);

      if (children) {
        children = map(children, layer + 1);
      }

      if (!children) return func(node, index, layer + 1, children);

      return { ...func(node, index, layer + 1, children), children };
    });
  };

  return map(nodes);
}

function findNode(
  nodes,
  checker = emptyFunction.thatReturnsTrue,
  childrenKey = 'children'
) {
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

function filterNodes(
  nodes,
  checker = emptyFunction.thatReturnsTrue,
  childrenKey = 'children'
) {
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

export { eachNode, mapNode, findNode, filterNodes, flattenNodes };
