import _ from 'lodash';

function splitProps(data, keys) {
  data = data || {};
  keys = keys || [];

  return {
    props: _.pick(data, keys),
    attrs: _.omit(data, keys),
  };
}

function splitPropsByComponent(data, Component) {
  const keys = Object.keys((Component && Component.props) || {});

  data = data || {};

  return splitProps(data, keys);
}

export default { splitProps, splitPropsByComponent };
