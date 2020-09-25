const canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);
const memoized = {};
const prefixes = ['Webkit', 'ms', 'Moz', 'O'];
const prefixRegex = new RegExp(`^(${prefixes.join('|')})`);
const testStyle = canUseDOM ? document.createElement('div').style : {};

export function camelize(string) {
  return string.replace(/-(\w)/g, char => {
    return char.slice(1).toUpperCase();
  });
}

function getWithPrefix(name) {
  for (let i = 0; i < prefixes.length; i += 1) {
    let prefixedName = prefixes[i] + name;
    if (prefixedName in testStyle) {
      return prefixedName;
    }
  }
  return null;
}

/**
 * @param {string} property Name of a css property to check for.
 * @return {?string} property name supported in the browser, or null if not
 * supported.
 */
function getVendorPrefixedName(property) {
  let name = camelize(property);
  if (memoized[name] === undefined) {
    let capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
    if (prefixRegex.test(capitalizedName)) {
      throw new Error(
        `getVendorPrefixedName must only be called with unprefixed
          CSS property names. It was called with ${property}`
      );
    }
    memoized[name] = name in testStyle ? name : getWithPrefix(capitalizedName);
  }
  return memoized[name];
}

export default getVendorPrefixedName;
