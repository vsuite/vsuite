import VueTypes from 'vue-types';
import _ from 'lodash';
import moment from 'moment';

import { CALENDAR_STATE } from 'components/_calendar';

import DateRangeCalendar from './DateRangeCalendar.jsx';

export default {
  name: 'DateRangePicker',

  props: {
    format: VueTypes.string.def('YYYY-MM-DD'),
    isoWeek: VueTypes.bool.def(false),
    limitStartYear: {
      type: Number,
      default: undefined,
    },
    limitEndYear: {
      type: Number,
      default: undefined,
    },
    sequence: VueTypes.number,
    value: VueTypes.arrayOf(VueTypes.any).def([]),
    hoverValue: VueTypes.arrayOf(VueTypes.any),
    calendarDate: VueTypes.arrayOf(VueTypes.any).def(() => {
      const date = moment();

      return [date.clone(), date.clone().add(1, 'month')];
    }),
    disabledDate: Function,
  },

  data() {
    return { calendarState: null };
  },

  render() {
    const listeners = { on: _.pick(this.$listeners, ['select', 'mousemove']) };

    return (
      <DateRangeCalendar
        format={this.format}
        isoWeek={this.isoWeek}
        value={this.value}
        hoverValue={this.hoverValue}
        calendarDate={this.calendarDate}
        calendarState={this.calendarState}
        sequence={this.sequence}
        limitStartYear={this.limitStartYear}
        limitEndYear={this.limitEndYear}
        disabledDate={this.disabledDate}
        {...listeners}
        onMove-forword={this._handleMoveForward}
        onMove-backward={this._handleMoveBackward}
        onToggle-month-dropdown={this._handleToggleMonthDropdown}
        onChange-page-date={this._handleChangePageDate}
      />
    );
  },

  methods: {
    _handleMoveBackward(date) {
      this.$emit('change-calendar-date', this.sequence, date);
    },

    _handleMoveForward(date) {
      this.$emit('change-calendar-date', this.sequence, date);
    },

    _handleToggleMonthDropdown() {
      if (this.calendarState === CALENDAR_STATE.MONTH) {
        this.calendarState = null;
      } else {
        this.calendarState = CALENDAR_STATE.MONTH;
      }
    },

    _handleChangePageDate(date) {
      this.calendarState = null;

      this.$emit('change-calendar-date', this.sequence, date);
    },
  },
};
