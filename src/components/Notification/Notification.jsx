import VueTypes from 'vue-types';
import prefix, { defaultClassPrefix } from 'utils/prefix';

const CLASS_PREFIX = 'notification';
const getUid = () => {
  id += 1;
  return `vs-notification-${Date.now()}-${id}`;
};
let id = 0;

export default {
  name: 'Notification',

  props: {
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
  },

  data() {
    return {
      animated: false,
      notices: [],
    };
  },

  render() {
    return null;
  },

  methods: {
    add(notice) {
      notice.key = notice.key || getUid();
      notice.animated = true;

      if (!this.notices.some(n => n.key === notice.key)) {
        this.notices.push(notice);
      }
    },

    remove(key) {
      this.notices = this.notices.map(x => {
        if (x.key === key) {
          return { ...x, animated: false };
        }

        return x;
      });

      this.$nextTick(() => setTimeout(() => this._actualRemove(key), 1000));
    },

    _actualRemove(key) {
      this.notices = this.notices.filter(x => x.key !== key);
    },

    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
