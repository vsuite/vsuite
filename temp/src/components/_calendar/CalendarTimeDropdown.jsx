import VueTypes from 'vue-types';
import _ from 'lodash';
import moment from 'moment';
import prefix, { defaultClassPrefix } from 'utils/prefix';
import { getPosition, scrollTop } from 'shares/dom';

import { scrollTopAnimation } from './utils';

const CLASS_PREFIX = 'calendar-time-dropdown';
const RANGES = {
  hours: { start: 0, end: 23 },
  minutes: { start: 0, end: 59 },
  seconds: { start: 0, end: 59 },
};

export default {
  name: 'CalendarTimeDropdown',

  props: {
    date: VueTypes.any,
    show: VueTypes.bool.def(false),
    format: VueTypes.string,
    disabledDate: Function,
    disabledHours: Function,
    disabledMinutes: Function,
    disabledSeconds: Function,
    hideHours: Function,
    hideMinutes: Function,
    hideSeconds: Function,
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
    // select
  },

  computed: {
    time() {
      const time = this.date || moment();
      let nextTime = {};

      if (!this.format) {
        return nextTime;
      }

      if (/([Hh])/.test(this.format)) {
        nextTime.hours = time.hours();
      }

      if (/m/.test(this.format)) {
        nextTime.minutes = time.minutes();
      }

      if (/s/.test(this.format)) {
        nextTime.seconds = time.seconds();
      }

      return nextTime;
    },
  },

  mounted() {
    this._updateScrollPosition();
  },

  updated() {
    this._updateScrollPosition();
  },

  render(h) {
    const data = {
      class: this.classPrefix,
      directives: [{ name: 'show', value: this.show }],
    };

    return (
      <div {...data}>
        <div class={this._addPrefix('content')} ref="content">
          <div class={this._addPrefix('row')}>
            {this._renderColumn(h, 'hours', this.time.hours)}
            {this._renderColumn(h, 'minutes', this.time.minutes)}
            {this._renderColumn(h, 'seconds', this.time.seconds)}
          </div>
        </div>
      </div>
    );
  },

  methods: {
    _renderColumn(h, type, active) {
      if (!_.isNumber(active)) {
        return null;
      }

      const { start, end } = RANGES[type];
      const items = [];

      const hideFunc = this[_.camelCase(`hide_${type}`)];
      const disabledFunc = this[_.camelCase(`disabled_${type}`)];

      for (let i = start; i <= end; i += 1) {
        if (!(hideFunc && hideFunc(i, this.date))) {
          const disabled = disabledFunc && disabledFunc(i, this.date);
          const itemClasses = [
            this._addPrefix('cell'),
            {
              [this._addPrefix('cell-active')]: active === i,
              [this._addPrefix('cell-disabled')]: disabled,
            },
          ];

          items.push(
            <li key={i}>
              <a
                class={itemClasses}
                role="menu"
                tabindex="-1"
                data-key={`${type}-${i}`}
                onClick={event =>
                  !disabled && this._handleClick(type, i, event)
                }
              >
                {i}
              </a>
            </li>
          );
        }
      }

      return (
        <div class={this._addPrefix('column')}>
          <div class={this._addPrefix('column-title')}>
            {this.$t(`_.Calendar.${type}`)}
          </div>
          <ul ref={`container-${type}`}>{items}</ul>
        </div>
      );
    },

    _updateScrollPosition() {
      if (!this.show) return;

      Object.entries(this.time).forEach(item => {
        const ref = this.$refs[`container-${item[0]}`];
        const container = (ref && ref.$el) || ref;
        const node = container.querySelector(
          `[data-key="${item[0]}-${item[1]}"]`
        );

        if (node && container) {
          const { top } = getPosition(node, container);

          scrollTopAnimation(container, top, scrollTop(container) !== 0);
        }
      });
    },

    _handleClick(type, d, event) {
      const nextDate = moment(this.date)[type](d);

      this.$emit('select', nextDate, event);
    },

    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
