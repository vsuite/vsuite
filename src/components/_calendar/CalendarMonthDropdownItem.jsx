import VueTypes from 'vue-types';
import moment from 'moment';
import prefix, { defaultClassPrefix } from 'utils/prefix';

const CLASS_PREFIX = 'calendar-month-dropdown-cell';

export default {
  name: 'CalendarMonthDropdownItem',

  props: {
    date: VueTypes.any,
    month: VueTypes.number,
    year: VueTypes.number,
    active: VueTypes.bool.def(false),
    disabled: VueTypes.bool.def(false),
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
  },

  computed: {
    classes() {
      return [
        this.classPrefix,
        {
          [this._addPrefix('active')]: this.active,
          [this._addPrefix('disabled')]: this.disabled,
        },
      ];
    },
  },

  render() {
    return (
      <div
        key={this.monday}
        class={this.classes}
        role="button"
        tabindex="-1"
        onClick={this._handleClick}
      >
        <span class={this._addPrefix('content')}>{this.month}</span>
      </div>
    );
  },

  methods: {
    _handleClick() {
      if (this.year && this.month && this.date) {
        const nextMonth = moment(this.date)
          .year(this.year)
          .month(this.month - 1);

        this.$emit('select', nextMonth, event);
      }
    },

    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
