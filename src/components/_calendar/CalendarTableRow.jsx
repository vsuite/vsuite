import VueTypes from 'vue-types';
import moment from 'moment';
import prefix, { defaultClassPrefix } from 'utils/prefix';

const CLASS_PREFIX = 'calendar-table';

export default {
  name: 'CalendarTableRow',

  props: {
    weekendDate: VueTypes.object,
    selected: VueTypes.object.def(moment()),
    disabledDate: Function,
    inSameMonth: Function,
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
  },

  render(h) {
    return <div class={this._addPrefix('row')}>{this._renderDays(h)}</div>;
  },

  methods: {
    _renderDays() {
      const days = [];

      for (let i = 0; i < 7; i += 1) {
        const thisDate = moment(this.weekendDate).add(i, 'd');
        const disabled =
          this.disabledDate && this.disabledDate(thisDate.clone());
        const isToday = thisDate.isSame(moment(), 'date');
        const classes = [
          this._addPrefix('cell'),
          {
            [this._addPrefix('cell-un-same-month')]: !(
              this.inSameMonth && this.inSameMonth(thisDate)
            ),
            [this._addPrefix('cell-is-today')]: isToday,
            [this._addPrefix('cell-selected')]: thisDate.isSame(
              this.selected,
              'date'
            ),
            [this._addPrefix('cell-disabled')]: disabled,
          },
        ];

        days.push(
          <div
            class={classes}
            role="menu"
            tabindex="-1"
            title={isToday ? 'Today' : ''}
            key={i}
            onClick={this._handleSelect.bind(this, thisDate, disabled)}
          >
            <span class={this._addPrefix('cell-content')}>
              {thisDate.date()}
            </span>
          </div>
        );
      }

      return days;
    },

    _handleSelect(date, disabled) {
      if (disabled) return;

      this.$emit('select', date);
    },

    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
