import VueTypes from 'vue-types';
import moment from 'moment';
import prefix, { defaultClassPrefix } from 'utils/prefix';
import { scrollTop } from 'shares/dom';

import CalendarMonthDropdownItem from './CalendarMonthDropdownItem.jsx';

import { scrollTopAnimation } from './util';

const CLASS_PREFIX = 'calendar-month-dropdown';
const MIN_YEAR = 1950;
const BLOCK_HEIGHT = 84;
const MONTH_MAP = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

export default {
  name: 'CalendarMonthDropdown',

  props: {
    date: VueTypes.any.def(moment()),
    show: VueTypes.bool.def(false),
    limitStartYear: VueTypes.number.def(5),
    limitEndYear: VueTypes.number.def(5),
    disabledMonth: Function,
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
  },

  mounted() {
    this._updateScrollPosition();
  },

  updated() {
    this._updateScrollPosition();
  },

  render(h) {
    const data = {
      class: this.classPrefix,
      directives: [{ name: 'show', value: this.show }],
    };

    return (
      <div {...data}>
        <div class={this._addPrefix('content')}>
          <div class={this._addPrefix('scroll')} ref="scroll">
            {this._renderBlock(h)}
          </div>
        </div>
      </div>
    );
  },

  methods: {
    _renderBlock(h) {
      const ret = [];
      const selectedMonth = this.date.month();
      const selectedYear = this.date.year();
      const startYear = this._getStartYear();
      let nextYear = 0;

      for (
        let i = 0;
        i < 100 && nextYear < selectedYear + this.limitEndYear;
        i += 1
      ) {
        nextYear = startYear + i;

        const isSelectedYear = nextYear === selectedYear;
        const titleClasses = [
          this._addPrefix('year'),
          { [this._addPrefix('year-active')]: isSelectedYear },
        ];

        ret.push(
          <div class={this._addPrefix('row')} key={i}>
            <div class={titleClasses}>{nextYear}</div>
            <div class={this._addPrefix('list')}>
              {MONTH_MAP.map((i, month) => {
                const disabled =
                  this.disabledMonth &&
                  this.disabledMonth(
                    moment()
                      .year(nextYear)
                      .month(month)
                  );

                return (
                  <CalendarMonthDropdownItem
                    key={month}
                    date={this.date}
                    disabled={disabled}
                    active={isSelectedYear && month === selectedMonth}
                    month={month + 1}
                    year={nextYear}
                    onSelect={this._handleSelect}
                  />
                );
              })}
            </div>
          </div>
        );
      }

      return ret;
    },

    _getStartYear() {
      const startYear = this.date.year() - this.limitStartYear;

      return Math.max(startYear, MIN_YEAR);
    },

    _updateScrollPosition() {
      const year = this.date.year();
      const top = (year - this._getStartYear()) * BLOCK_HEIGHT;
      const scroll =
        (this.$refs.scroll && this.$refs.scroll.$el) || this.$refs.scroll;

      scrollTopAnimation(scroll, top, scrollTop(scroll) !== 0);
    },

    _handleSelect(monthDate, event) {
      this.$emit('select', monthDate, event);
    },

    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
