import VueTypes from 'vue-types';
import prefix, { defaultClassPrefix } from 'utils/prefix';

import CalendarTableHeaderRow from './CalendarTableHeaderRow.jsx';
import CalendarTableRow from './CalendarTableRow.jsx';

const CLASS_PREFIX = 'calendar-table';

export default {
  name: 'CalendarTable',

  props: {
    rows: VueTypes.arrayOf(VueTypes.any).def([]),
    selected: VueTypes.object,
    isoWeek: VueTypes.bool.def(false),
    disabledDate: Function,
    inSameMonth: Function,
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
  },

  render() {
    return (
      <div class={this.classPrefix}>
        <CalendarTableHeaderRow isoWeek={this.isoWeek} />

        {this.rows.map((week, index) => (
          <CalendarTableRow
            key={index}
            weekendDate={week}
            selected={this.selected}
            disabledDate={this.disabledDate}
            inSameMonth={this.inSameMonth}
            onSelect={this._handleSelect}
          />
        ))}
      </div>
    );
  },

  methods: {
    _handleSelect(date) {
      this.$emit('select', date);
    },

    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
