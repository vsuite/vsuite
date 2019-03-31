import VueTypes from 'vue-types';
import prefix, { globalKey, defaultClassPrefix } from 'utils/prefix';
import renderX from 'utils/render';

import Notice from './Notice.jsx';

const CLASS_PREFIX = 'notification';
const getUid = () => {
  id += 1;
  return `${globalKey}notification-${Date.now()}-${id}`;
};
let id = 0;

export default {
  name: 'Notification',

  props: {
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
  },

  data() {
    return {
      notices: [],
    };
  },

  render(h) {
    return (
      <transition-group
        class={this.classPrefix}
        tag="div"
        type="animation"
        enterActiveClass={this._addPrefix('fade-entering')}
        enterToClass={this._addPrefix('fade-entered')}
        leaveActiveClass={`${this._addPrefix('fade-entered')} ${this._addPrefix(
          'fade-leave-active'
        )}`}
        leaveToClass={this._addPrefix('fade-exited')}
        onAfterLeave={this._handleAfterLeave}
      >
        {this.notices.map(notice => {
          const {
            key,
            className,
            style,
            type,
            content,
            duration,
            closable,
            onClose,
          } = notice;
          const data = {
            key,
            props: {
              type,
              closable,
              duration,
              wrapperClassName: className,
              wrapperStyle: style,
              classPrefix: this.classPrefix,
            },
            on: {
              close: () => {
                this.remove(notice.key);
                onClose && onClose();
              },
            },
          };

          return (
            <Notice {...data}>
              <template slot="content">{renderX(h, content)}</template>
            </Notice>
          );
        })}
      </transition-group>
    );
  },

  methods: {
    add(notice) {
      notice.key = notice.key || getUid();

      if (!this.notices.some(n => n.key === notice.key)) {
        this.notices.push(notice);

        return notice.key;
      }

      return null;
    },

    remove(key) {
      this.notices = this.notices.filter(x => x.key !== key);
    },

    _handleAfterLeave() {
      if (this.notices.length > 0) return;

      this.$emit('empty');
    },

    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
