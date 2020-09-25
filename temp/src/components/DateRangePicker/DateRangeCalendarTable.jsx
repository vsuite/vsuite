import VueTypes from 'vue-types';
import prefix, { defaultClassPrefix } from 'utils/prefix';

import { CalendarTableHeaderRow } from 'components/_calendar';

import DateRangeCalendarTableRow from './DateRangeCalendarTableRow.jsx';

const CLASS_PREFIX = 'calendar-table';

export default {
  name: 'DateRangeCalendarTable',

  props: {
    rows: VueTypes.arrayOf(VueTypes.any).def([]),
    selected: VueTypes.arrayOf(VueTypes.any),
    hoverValue: VueTypes.arrayOf(VueTypes.any),
    isoWeek: VueTypes.bool.def(false),
    inSameMonth: Function,
    disabledDate: Function,
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
  },

  render() {
    const listeners = { on: this.$listeners };

    return (
      <div class={this.classPrefix}>
        <CalendarTableHeaderRow isoWeek={this.isoWeek} />
        {this.rows.map((week, index) => (
          <DateRangeCalendarTableRow
            key={index}
            weekendDate={week}
            selected={this.selected}
            hoverValue={this.hoverValue}
            inSameMonth={this.inSameMonth}
            disabledDate={this.disabledDate}
            {...listeners}
          />
        ))}
      </div>
    );
  },

  methods: {
    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
