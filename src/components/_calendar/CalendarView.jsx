import VueTypes from 'vue-types';
import moment from 'moment';
import prefix, { defaultClassPrefix } from 'utils/prefix';

import CalendarTable from './CalendarTable.jsx';

import { getMonthView } from './util';

const CLASS_PREFIX = 'calendar-view';

export default {
  name: 'CalendarView',

  props: {
    activeDate: VueTypes.any.def(moment()),
    isoWeek: VueTypes.bool.def(false),
    disabledDate: Function,
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
  },

  computed: {
    thisMonthDate() {
      return this.activeDate && this.activeDate.clone().date(1);
    },
  },

  render() {
    return (
      <div class={this.classPrefix}>
        <CalendarTable
          rows={getMonthView(this.thisMonthDate, this.isoWeek)}
          isoWeek={this.isoWeek}
          selected={this.activeDate}
          disabledDate={this.disabledDate}
          inSameMonth={this._inSameThisMonthDate}
          onSelect={this._handleSelect}
        />
      </div>
    );
  },

  methods: {
    _inSameThisMonthDate(date) {
      return date.month() === this.thisMonthDate.month();
    },

    _handleSelect(date, event) {
      this.$emit('select', date, event);
    },

    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
