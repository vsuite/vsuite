import _ from 'lodash';

function getToggleWrapperClassName(name, prefix, props, hasValue, classes) {
  const { placement, appearance, cleanable, block, disabled } = props;

  return [
    prefix(name),
    prefix(appearance),
    prefix(`placement-${_.kebabCase(placement)}`),
    prefix('toggle-wrapper'),
    {
      [prefix('block')]: block,
      [prefix('has-value')]: hasValue,
      [prefix('disabled')]: disabled,
      [prefix('cleanable')]: hasValue && cleanable,
      ...(classes || {}),
    },
  ];
}

export default getToggleWrapperClassName;
