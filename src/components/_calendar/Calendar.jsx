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

  render() {
    const showMonth = shouldMonth(this.format);
    const showDate = shouldDate(this.format);
    const showTime = shouldTime(this.format);

    const onlyShowTime = showTime && !showDate && !showMonth;
    const onlyShowMonth = showMonth && !showDate && !showTime;
    const dropTime = this.calendarState === CALENDAR_STATE.TIME || onlyShowTime;
    const dropMonth =
      this.calendarState === CALENDAR_STATE.MONTH || onlyShowMonth;
    const classes = [
      this.classPrefix,
      {
        [this._addPrefix('show-time-dropdown')]: dropTime,
        [this._addPrefix('show-month-dropdown')]: dropMonth,
      },
    ];

    return (
      <div class={classes}>
        <CalendarHeader
          date={this.pageDate}
          format={this.format}
          showMonth={showMonth}
          showDate={showDate}
          showTime={showTime}
          disabledDate={this._disabledDate}
          disabledTime={this._disabledTime}
          onMove-forward={this._handleMoveForward}
          onMove-backward={this._handleMoveBackward}
          onToggle-month-dropdown={this._handleToggleMonthDropdown}
          onToggle-time-dropdown={this._handleToggleTimeDropdown}
        />
        {showDate && (
          <CalendarView
            key="MonthView"
            activeDate={this.pageDate}
            isoWeek={this.isoWeek}
            disabledDate={this._disabledDate}
            onSelect={this._handleSelect}
          />
        )}
        {showMonth && (
          <CalendarMonthDropdown
            date={this.pageDate}
            show={dropMonth}
            limitStartYear={this.limitStartYear}
            limitEndYear={this.limitEndYear}
            onSelect={this._handleChangePageMonth}
          />
        )}
        {showTime && (
          <CalendarTimeDropdown
            date={this.pageDate}
            format={this.format}
            show={dropTime}
            disabledHours={this.disabledHours}
            disabledMinutes={this.disabledMinutes}
            disabledSeconds={this.disabledSeconds}
            hideHours={this.hideHours}
            hideMinutes={this.hideMinutes}
            hideSeconds={this.hideSeconds}
            onSelect={this._handleChangePageTime}
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

    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
