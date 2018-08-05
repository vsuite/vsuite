import _ from 'lodash';
import enUS from 'langs/en_US';

const DEFAULT_LOCALE = 'en_US';
const listeners = [];
let messages = { [DEFAULT_LOCALE]: enUS };
let message = {};
let locale = DEFAULT_LOCALE;

export function config(options) {
  options = options || {};
  locale = options.locale || DEFAULT_LOCALE;
  messages = _.merge(messages, options.messages || {});
  message = messages[locale] || {};
}

export function t(name, data) {
  const template = _.get(message, name || '');

  data = data || {};
  if (!name) return message;
  if (typeof template !== 'string') return template;
  if (!~listeners.indexOf(this)) listeners.push(this);

  return template.replace(/{{(.*?)}}/gm, (__, key) => _.get(data, _.trim(key)));
}

export function setLang(lang = DEFAULT_LOCALE) {
  locale = lang;
  message = messages[locale] || {};

  listeners.forEach(vm => this.$nextTick(() => vm.$forceUpdate()));
}
