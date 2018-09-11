import VueTypes from 'vue-types';
import prefix, { defaultClassPrefix } from 'utils/prefix';

import CalendarHeader from './CalendarHeader.jsx';
import CalendarView from './CalendarView.jsx';
import CalendarMonthDropdown from './CalendarMonthDropdown.jsx';
import CalendarTimeDropdown from './CalendarTimeDropdown.jsx';

import { CALENDAR_STATE } from './constant';
import { shouldDate, shouldMonth, shouldTime, disabledTime } from './util';

const CLASS_PREFIX = 'calendar';

export default {
  name: 'Calendar',

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
    pageDate: VueTypes.any,
    disabledDate: Function,
    disabledHours: Function,
    disabledMinutes: Function,
    disabledSeconds: Function,
    hideHours: Function,
    hideMinutes: Function,
    hideSeconds: Function,
    calendarState: VueTypes.oneOf([CALENDAR_STATE.MONTH, CALENDAR_STATE.TIME]),
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
  },

  computed: {
    showDate() {
      return shouldDate(this.format);
    },

    showMonth() {
      return shouldMonth(this.format);
    },

    showTime() {
      return shouldTime(this.format);
    },

    onlyShowMonth() {
      return this.showMonth && !this.showDate && !this.showTime;
    },

    onlyShowTime() {
      return this.showTime && !this.showDate && !this.showMonth;
    },

    dropMonth() {
      return this.calendarState === CALENDAR_STATE.MONTH || this.onlyShowMonth;
    },

    dropTime() {
      return this.calendarState === CALENDAR_STATE.TIME || this.onlyShowTime;
    },

    classes() {
      return [
        this.classPrefix,
        {
          [this._addPrefix('show-time-dropdown')]: this.dropTime,
          [this._addPrefix('show-month-dropdown')]: this.dropMonth,
        },
      ];
    },
  },

  render() {
    return (
      <div class={this.classes}>
        <CalendarHeader
          date={this.pageDate}
          format={this.format}
          showMonth={this.showMonth}
          showDate={this.showDate}
          showTime={this.showTime}
          disabledDate={this._disabledDate}
          disabledTime={this._disabledTime}
          onMove-forward={this._handleMoveForward}
          onMove-backward={this._handleMoveBackward}
          onToggle-month-dropdown={this._handleToggleMonthDropdown}
          onToggle-time-dropdown={this._handleToggleTimeDropdown}
        />
        {this.showDate && (
          <CalendarView
            key="MonthView"
            activeDate={this.pageDate}
            isoWeek={this.isoWeek}
            disabledDate={this._disabledDate}
            onSelect={this._handleSelect}
          />
        )}
        {this.showMonth && (
          <CalendarMonthDropdown
            date={this.pageDate}
            show={this.dropMonth}
            limitStartYear={this.limitStartYear}
            limitEndYear={this.limitEndYear}
            onSelect={this._handleChangePageMonth}
            ref="month"
          />
        )}
        {this.showTime && (
          <CalendarTimeDropdown
            date={this.pageDate}
            format={this.format}
            show={this.dropTime}
            disabledHours={this.disabledHours}
            disabledMinutes={this.disabledMinutes}
            disabledSeconds={this.disabledSeconds}
            hideHours={this.hideHours}
            hideMinutes={this.hideMinutes}
            hideSeconds={this.hideSeconds}
            onSelect={this._handleChangePageTime}
            ref="time"
          />
        )}
      </div>
    );
  },

  methods: {
    _disabledDate(date) {
      return this.disabledDate && this.disabledDate(date);
    },

    _disabledTime(date) {
      return disabledTime(this, date);
    },

    _handleSelect(date, event) {
      this.$emit('select', date, event);
    },

    _handleMoveBackward(event) {
      this.$emit(
        'move-backward',
        this.pageDate.clone().add(-1, 'month'),
        event
      );
    },

    _handleMoveForward(event) {
      this.$emit('move-forward', this.pageDate.clone().add(1, 'month'), event);
    },

    _handleToggleMonthDropdown(event) {
      this.$emit('toggle-month-dropdown', event);
    },

    _handleToggleTimeDropdown() {
      this.$emit('toggle-time-dropdown', event);
    },

    _handleChangePageMonth(monthDate, event) {
      this.$emit('change-page-date', monthDate, event);
    },

    _handleChangePageTime(timeDate, event) {
      this.$emit('change-page-time', timeDate, event);
    },

    _updateScrollPosition() {
      if (this.showMonth && this.dropMonth) {
        this.$refs.month && this.$refs.month._updateScrollPosition();
      }

      if (this.showTime && this.dropTime) {
        this.$refs.time && this.$refs.time._updateScrollPosition();
      }
    },

    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
