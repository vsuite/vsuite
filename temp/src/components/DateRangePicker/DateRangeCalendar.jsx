import VueTypes from 'vue-types';
import moment from 'moment';
import prefix, { defaultClassPrefix } from 'utils/prefix';

import {
  CalendarHeader,
  CalendarMonthDropdown,
  CALENDAR_STATE,
} from 'components/_calendar';

import DateRangeCalendarView from './DateRangeCalendarView.jsx';

const CLASS_PREFIX = 'calendar';

export default {
  name: 'DateRangeCalendar',

  props: {
    format: VueTypes.string,
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
    value: VueTypes.arrayOf(VueTypes.any),
    hoverValue: VueTypes.arrayOf(VueTypes.any),
    calendarDate: VueTypes.arrayOf(VueTypes.any).def([
      moment(),
      moment().add(1, 'month'),
    ]),
    disabledDate: Function,
    calendarState: VueTypes.oneOf([CALENDAR_STATE.MONTH, CALENDAR_STATE.TIME]),
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
  },

  computed: {
    pageDate() {
      return this.calendarDate[this.sequence];
    },

    dropMonth() {
      return this.calendarState === CALENDAR_STATE.MONTH;
    },

    classes() {
      return [
        this.classPrefix,
        { [this._addPrefix('show-month-dropdown')]: this.dropMonth },
      ];
    },

    disabledBackward() {
      const isAfter = this.calendarDate[1].isAfter(
        this.calendarDate[0].clone().add(1, 'month'),
        'month'
      );

      if (this.sequence === 0) {
        return false;
      }

      return !isAfter;
    },

    disabledForward() {
      const isAfter = this.calendarDate[1].isAfter(
        this.calendarDate[0].clone().add(1, 'month'),
        'month'
      );

      if (this.sequence === 1) {
        return false;
      }

      return !isAfter;
    },
  },

  render() {
    return (
      <div class={this.classes}>
        <CalendarHeader
          showMonth={true}
          date={this.pageDate}
          disabledBackward={this.disabledBackward}
          disabledForword={this.disabledForward}
          onMove-backward={this._handleMoveBackward}
          onMove-forward={this._handleMoveForward}
          onToggle-month-dropdown={this._handleToggleMonthDropdown}
        />

        <DateRangeCalendarView
          activeDate={this.pageDate}
          value={this.value}
          hoverValue={this.hoverValue}
          isoWeek={this.isoWeek}
          disabledDate={this.disabledDate}
          onSelect={this._handleSelect}
          onMousemove={this._handleMousemove}
        />

        <CalendarMonthDropdown
          show={this.dropMonth}
          date={this.pageDate}
          limitStartYear={this.limitStartYear}
          limitEndYear={this.limitEndYear}
          disabledMonth={this.disabledMonth}
          onSelect={this._handleChangePageDate}
        />
      </div>
    );
  },

  methods: {
    _handleMoveBackward() {
      this.$emit('move-backward', this.pageDate.clone().add(-1, 'month'));
    },

    _handleMoveForward() {
      this.$emit('move-forward', this.pageDate.clone().add(1, 'month'));
    },

    _handleToggleMonthDropdown(event) {
      this.$emit('toggle-month-dropdown', event);
    },

    _handleSelect(date, event) {
      this.$emit('select', date, event);
    },

    _handleMousemove(date, event) {
      this.$emit('mousemove', date, event);
    },

    _handleChangePageDate(date, event) {
      this.$emit('change-page-date', date, event);
    },

    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
