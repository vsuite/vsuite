import VueTypes from 'vue-types';
import moment from 'moment';
import prefix, { defaultClassPrefix } from 'utils/prefix';

import { getMonthView } from 'components/_calendar';

import DateRangeCalendarTable from './DateRangeCalendarTable.jsx';

const CLASS_PREFIX = 'calendar-view';

export default {
  name: 'DateRangeCalendarView',

  props: {
    activeDate: VueTypes.any.def(moment()),
    value: VueTypes.arrayOf(VueTypes.any),
    hoverValue: VueTypes.arrayOf(VueTypes.any),
    isoWeek: VueTypes.bool.def(false),
    disabledDate: Function,
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
  },

  computed: {
    thisMonthDate() {
      return this.activeDate && this.activeDate.clone().date(1);
    },

    rows() {
      return getMonthView(this.thisMonthDate, this.isoWeek);
    },
  },

  render() {
    const listeners = { on: this.$listeners };

    return (
      <div class={this.classPrefix}>
        <DateRangeCalendarTable
          rows={this.rows}
          selected={this.value}
          hoverValue={this.hoverValue}
          isoWeek={this.isoWeek}
          inSameMonth={this._inSameThisMonthDate.bind(this)}
          disabledDate={this.disabledDate}
          {...listeners}
        />
      </div>
    );
  },

  methods: {
    _inSameThisMonthDate(date) {
      return date.month() === this.thisMonthDate.month();
    },

    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
