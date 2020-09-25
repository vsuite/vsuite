// Find components upward
export function findComponentUpward(context, componentName, recurse = true) {
  let componentNames = [];

  if (typeof componentName === 'string') {
    componentNames = [componentName];
  } else {
    componentNames = componentName;
  }

  let parent = context.$parent;
  let name = parent.$options.name;

  if (!recurse && parent && (!name || componentNames.indexOf(name) < 0)) {
    return null;
  } else if (!recurse) {
    return parent;
  }

  while (parent && (!name || componentNames.indexOf(name) < 0)) {
    parent = parent.$parent;

    if (parent) name = parent.$options.name;
  }

  return parent;
}

// Find components upward
export function findComponentsUpward(context, componentName) {
  const parent = context.$parent;
  let parents = [];

  if (parent) {
    if (parent.$options.name === componentName) parents.push(parent);

    return parents.concat(findComponentsUpward(parent, componentName));
  } else {
    return [];
  }
}

// Find component downward
export function findComponentDownward(context, componentName) {
  const children = context.$children;
  let child = null;

  if (children.length) {
    for (const c of children) {
      const name = c.$options.name;

      if (name === componentName) {
        child = c;

        break;
      } else {
        child = findComponentDownward(c, componentName);

        if (child) break;
      }
    }
  }

  return child;
}

// Find components downward
export function findComponentsDownward(context, componentName) {
  return context.$children.reduce((components, child) => {
    if (child.$options.name === componentName) components.push(child);

    const foundChildren = findComponentsDownward(child, componentName);

    return components.concat(foundChildren);
  }, []);
}

// Find brothers components
export function findBrothersComponents(
  context,
  componentName,
  exceptMe = true
) {
  let res = context.$parent.$children.filter(item => {
    return item.$options.name === componentName;
  });
  let index = res.findIndex(item => item._uid === context._uid);

  if (exceptMe) res.splice(index, 1);

  return res;
}
