import Vue from 'vue';
import _ from 'lodash';

const BUILDIN_ELEMENT_NAMES = [
  'a',
  'abbr',
  'acronym',
  'address',
  'applet',
  'area',
  'article',
  'aside',
  'audio',
  'b',
  'base',
  'basefont',
  'bdi',
  'bdo',
  'bgsound',
  'big',
  'blink',
  'blockquote',
  'body',
  'br',
  'button',
  'canvas',
  'caption',
  'center',
  'cite',
  'code',
  'col',
  'colgroup',
  'command',
  'content',
  'data',
  'datalist',
  'dd',
  'del',
  'details',
  'dfn',
  'dialog',
  'dir',
  'div',
  'dl',
  'dt',
  'element',
  'em',
  'embed',
  'fieldset',
  'figcapture',
  'figure',
  'font',
  'footer',
  'form',
  'frame',
  'frameset',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'head',
  'header',
  'hgroup',
  'hr',
  'html',
  'i',
  'iframe',
  'image',
  'img',
  'input',
  'ins',
  'isindex',
  'kbd',
  'keygen',
  'label',
  'legend',
  'li',
  'link',
  'listing',
  'main',
  'map',
  'mark',
  'marquee',
  'menu',
  'menuitem',
  'meta',
  'meter',
  'multicol',
  'nav',
  'nextid',
  'nobr',
  'noembed',
  'noframes',
  'noscript',
  'object',
  'ol',
  'optgroup',
  'option',
  'output',
  'p',
  'param',
  'picture',
  'plaintext',
  'pre',
  'progress',
  'q',
  'rb',
  'rp',
  'rt',
  'rtc',
  'ruby',
  's',
  'samp',
  'script',
  'section',
  'select',
  'shadow',
  'slot',
  'small',
  'source',
  'spacer',
  'span',
  'strike',
  'strong',
  'style',
  'sub',
  'summary',
  'sup',
  'table',
  'tbody',
  'td',
  'template',
  'textarea',
  'tfoot',
  'th',
  'thead',
  'time',
  'title',
  'tr',
  'track',
  'tt',
  'u',
  'ul',
  'var',
  'video',
  'wbr',
  'xmp',
];

export function splitProps(data, keys) {
  data = _.omitBy(data || {}, _.isUndefined);
  keys = keys || [];

  return {
    props: _.pick(data, keys),
    attrs: _.omit(data, keys),
  };
}

export function splitPropsByComponent(data, element) {
  let Component = element;

  if (_.isString(Component) && !~BUILDIN_ELEMENT_NAMES.indexOf(Component)) {
    const vue = Vue || window.Vue;

    if (vue && vue.options && vue.options.components) {
      Component = vue.options.components[Component];

      if (Component) {
        Component = Component.options;
      }
    }
  }

  const compProps = (Component && Component.props) || {};
  const compMixins = (Component && Component.mixins) || [];
  let res = {};
  let keys = Object.keys(compProps);

  compMixins.forEach(
    mixin => (keys = keys.concat(Object.keys((mixin && mixin.props) || {})))
  );

  const props = _.cloneDeep(data || {});

  // special processing for domProps
  if (element === 'input') {
    const valueIndex = Object.keys(props).indexOf('value');
    const checkedIndex = Object.keys(props).indexOf('checked');

    // exists value property
    if (~valueIndex) {
      res = _.merge(res, { domProps: { value: props.value } });

      delete props.value;
    }

    // exisys checked property
    if (~checkedIndex) {
      res = _.merge(res, { domProps: { checked: props.checked } });

      delete props.checked;
    }
  }

  return _.merge(res, splitProps(props, keys));
}

export function splitDataByComponent(data, Component, def = false) {
  if (_.isBoolean(Component)) {
    def = Component;
    Component = undefined;
  }

  data = data || {};

  const props = data.splitProps || {};

  return def
    ? _.merge(
        _.omit(data, 'splitProps'),
        splitPropsByComponent(props, Component)
      )
    : _.merge(
        splitPropsByComponent(props, Component),
        _.omit(data, 'splitProps')
      );
}
