import VueTypes from 'vue-types';
import _ from 'lodash';
import moment from 'moment';
import prefix, { defaultClassPrefix } from 'utils/prefix';

import { DATE_RANGE_TYPES } from './constant';

const CLASS_PREFIX = 'calendar-table';

export default {
  name: 'DateRangeCalendarTableRow',

  props: {
    weekendDate: VueTypes.any,
    selected: VueTypes.arrayOf(VueTypes.any).def([]),
    hoverValue: VueTypes.arrayOf(VueTypes.any).def([]),
    inSameMonth: Function,
    disabledDate: Function,
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
  },

  computed: {
    selectedStartDate() {
      return this.selected[0] ? this.selected[0].clone() : null;
    },

    selectedEndDate() {
      return this.selected[1] ? this.selected[1].clone() : null;
    },

    hoverStartDate() {
      return this.hoverValue[0] || null;
    },

    hoverEndDate() {
      return this.hoverValue[1] || null;
    },
  },

  render(h) {
    return <div class={this._addPrefix('row')}>{this._renderDays(h)}</div>;
  },

  methods: {
    _renderDays() {
      const days = [];

      for (let i = 0; i < 7; i += 1) {
        const thisDate = moment(this.weekendDate).add(i, 'd');
        const selectValue = [this.selectedStartDate, this.selectedEndDate];
        const disabled =
          this.disabledDate &&
          this.disabledDate(
            thisDate.clone(),
            selectValue,
            DATE_RANGE_TYPES.CALENDAR
          );
        const isToday = thisDate.isSame(moment(), 'date');
        const unSameMonth = !(this.inSameMonth && this.inSameMonth(thisDate));
        let inRange = false;

        const isStartSelected =
          !unSameMonth &&
          this.selectedStartDate &&
          thisDate.isSame(this.selectedStartDate, 'date');
        const isEndSelected =
          !unSameMonth &&
          this.selectedEndDate &&
          thisDate.isSame(this.selectedEndDate, 'date');

        const isSelected = isStartSelected || isEndSelected;

        // for Selected
        if (this.selectedStartDate && this.selectedEndDate) {
          if (
            thisDate.isBefore(this.selectedEndDate, 'date') &&
            thisDate.isAfter(this.selectedStartDate, 'date')
          ) {
            inRange = true;
          }
          if (
            thisDate.isBefore(this.selectedStartDate, 'date') &&
            thisDate.isAfter(this.selectedEndDate, 'date')
          ) {
            inRange = true;
          }
        }

        // for Hovering
        if (!isSelected && this.hoverEndDate && this.hoverStartDate) {
          if (
            !thisDate.isAfter(this.hoverEndDate, 'date') &&
            !thisDate.isBefore(this.hoverStartDate, 'date')
          ) {
            inRange = true;
          }
          if (
            !thisDate.isAfter(this.hoverStartDate, 'date') &&
            !thisDate.isBefore(this.hoverEndDate, 'date')
          ) {
            inRange = true;
          }
        }

        const title = thisDate.format('YYYY-MM-DD');
        const classes = [
          this._addPrefix('cell'),
          {
            [this._addPrefix('cell-un-same-month')]: unSameMonth,
            [this._addPrefix('cell-is-today')]: isToday,
            [this._addPrefix('cell-selected-start')]: isStartSelected,
            [this._addPrefix('cell-selected-end')]: isEndSelected,
            [this._addPrefix('cell-selected')]: isSelected,
            [this._addPrefix('cell-in-range')]: !unSameMonth && inRange,
            [this._addPrefix('cell-disabled')]: disabled,
          },
        ];

        let listeners = { on: {} };

        if (!disabled) {
          listeners = {
            on: {
              mouseenter: event => this._handleMouseenter(thisDate, event),
              click: _.debounce(
                event => this._handleSelect(thisDate, event),
                100
              ),
            },
          };
        }

        days.push(
          <div
            key={title}
            class={classes}
            role="menu"
            tabIndex="-1"
            title={isToday ? `${title} (Today)` : title}
            {...listeners}
          >
            <span class={this._addPrefix('cell-content')}>
              {thisDate.date()}
            </span>
          </div>
        );
      }

      return days;
    },

    _handleMouseenter(date, event) {
      this.$emit('mousemove', date, event);
    },

    _handleSelect(date, event) {
      this.$emit('select', date, event);
    },

    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
