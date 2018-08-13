import VueTypes from 'vue-types';
import _ from 'lodash';
import prefix, { defaultClassPrefix } from 'utils/prefix';

import Notice from './Notice.jsx';

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
      notices: [],
    };
  },

  render(h) {
    return (
      <transition-group
        class={this.classPrefix}
        style={{ top: '5px' }}
        tag="div"
        type="animation"
        enterActiveClass={this._addPrefix('fade-entering')}
        enterToClass={this._addPrefix('fade-entered')}
        leaveActiveClass={`${this._addPrefix('fade-entered')} ${this._addPrefix(
          'fade-leave-active'
        )}`}
        leaveToClass={this._addPrefix('fade-exited')}
      >
        {this.notices.map(notice => {
          const {
            key,
            style,
            type,
            content,
            duration,
            closable,
            onClose,
          } = notice;
          const data = {
            key,
            style,
            props: {
              type,
              closable,
              duration,
              classPrefix: this.classPrefix,
            },
            on: {
              close: () => {
                this.remove(notice.key);
                onClose && onClose();
              },
            },
          };
          let slotContent = content;

          if (typeof slotContent === 'function') {
            slotContent = slotContent(h);
          }

          if (_.isArray(slotContent)) {
            slotContent = slotContent.map(
              c => (typeof c === 'function' ? c(h) : c)
            );
          }

          return (
            <Notice {...data}>
              <template slot="content">{slotContent}</template>
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
      }
    },

    remove(key) {
      this.notices = this.notices.filter(x => x.key !== key);
    },

    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
