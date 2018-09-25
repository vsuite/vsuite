import VueTypes from 'vue-types';
import _ from 'lodash';
import popperMixin from 'mixins/popper';
import prefix, { defaultClassPrefix } from 'utils/prefix';
import { splitDataByComponent } from 'utils/split';
import { findComponentUpward } from 'utils/find';

import {
  PickerMenuWrapper,
  PickerToggle,
  getToggleWrapperClassName,
} from 'components/_picker';

import DateRangePickerItem from './DateRangePickerItem.jsx';
import DateRangePickerToolbar from './DateRangePickerToolbar.jsx';

import { DATE_RANGE_TYPES } from './constant';
import { getCalendarDate, equalMoment, setTimingMargin } from './utils';

const CLASS_PREFIX = 'picker';
const Range = {
  label: VueTypes.any,
  value: VueTypes.any,
  closeOverlay: VueTypes.bool,
};

export default {
  name: 'DateRangePicker',

  model: {
    prop: 'value',
    event: 'change',
  },

  mixins: [popperMixin],

  props: {
    /* eslint-disable vue/require-prop-types */
    placement: {
      ...popperMixin.props.placement,
      default: 'bottom-start',
    },
    trigger: {
      ...popperMixin.props.trigger,
      default: 'click',
    },
    value: VueTypes.arrayOf(VueTypes.any),
    defaultValue: VueTypes.arrayOf(VueTypes.any),
    appearance: VueTypes.oneOf(['default', 'subtle']).def('default'),
    ranges: VueTypes.arrayOf(VueTypes.shape(Range)),
    placeholder: VueTypes.string,
    format: VueTypes.string.def('YYYY-MM-DD'),
    hoverRange: VueTypes.oneOfType([
      VueTypes.oneOf(['week', 'month']),
      VueTypes.func,
    ]),
    disabled: VueTypes.bool.def(false),
    block: VueTypes.bool.def(false),
    cleanable: VueTypes.bool,
    isoWeek: VueTypes.bool.def(false),
    oneTap: VueTypes.bool.def(false),
    limitStartYear: VueTypes.number.def(5),
    limitEndYear: VueTypes.number.def(5),
    disabledDate: Function,
    menuClassName: VueTypes.string,
    menuStyle: VueTypes.object,
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
  },

  data() {
    const initVal =
      (_.isUndefined(this.value) ? this.defaultValue : this.value) || [];

    return {
      innerVal: initVal,
      selectVal: initVal,
      hoverVal: [],
      currentHoverDate: null,
      doneSelected: true,
      calendarDate: getCalendarDate(initVal),
    };
  },

  computed: {
    currentVal() {
      return _.isUndefined(this.value) ? this.innerVal : this.value;
    },
  },

  watch: {
    currentVal(nextVal, preVal) {
      if (
        nextVal &&
        (!_.isArray(nextVal) ||
          !_.isArray(preVal) ||
          nextVal.some((x, i) => !equalMoment(x, preVal[i])))
      ) {
        this.selectVal = nextVal;
      }
    },
  },

  render(h) {
    const hasValue = this.currentVal && this.currentVal.length > 1;
    const referenceData = {
      class: getToggleWrapperClassName(
        'daterange',
        this._addPrefix,
        this,
        hasValue
      ),
      directives: [{ name: 'click-outside', value: this._handleClickOutside }],
      attrs: { tabindex: -1, role: 'menu' },
      ref: 'reference',
    };
    const toggleData = splitDataByComponent({
      splitProps: {
        ...this.$attrs,
        hasValue,
        cleanable: this.cleanable && !this.disabled,
        componentClass: this.toggleComponentClass,
      },
      on: { clean: this._handleClean },
    });
    const popperData = {
      directives: [
        { name: 'show', value: this.currentVisible },
        { name: 'transfer-dom' },
      ],
      attrs: { 'data-transfer': `${this.transfer}` },
      ref: 'popper',
    };

    if (!this.disabled) this._addTriggerListeners(toggleData, referenceData);

    return (
      <div {...referenceData}>
        <PickerToggle {...toggleData}>{this._getDateString()}</PickerToggle>
        <transition name="picker-fade">
          {this._renderDropdownMenu(h, popperData)}
        </transition>
      </div>
    );
  },

  methods: {
    _renderDropdownMenu(h, popperData) {
      popperData = _.merge(popperData, {
        class: [this._addPrefix('daterange-menu'), this.menuClassName],
        style: this.menuStyle,
      });

      const pickerData = {
        props: {
          value: this.selectVal,
          hoverValue: this.hoverVal,
          calendarDate: this.calendarDate,
          limitStartYear: this.limitStartYear,
          limitEndYear: this.limitEndYear,
          isoWeek: this.isoWeek,
          disabledDate: this._disabledDate,
        },
        on: {
          select: this._handleChangeSelectValue,
          mousemove: this._handleMouseMoveSelectValue,
          'change-calendar-date': this._handleChangeCalendarDate,
        },
      };

      return (
        <PickerMenuWrapper {...popperData}>
          <div class={this._addPrefix('daterange-panel')}>
            <div class={this._addPrefix('daterange-content')}>
              <div class={this._addPrefix('daterange-header')}>
                {this._getDateString(this.selectVal)}
              </div>
              <div class={this._addPrefix('daterange-calendar-group')}>
                <DateRangePickerItem sequence={0} {...pickerData} />
                <DateRangePickerItem sequence={1} {...pickerData} />
              </div>
            </div>
            <DateRangePickerToolbar
              ranges={this.ranges}
              selectValue={this.selectVal}
              disabledOkButton={this._disabledOkButton}
              disabledShortcutButton={this._disabledShortcutButton}
              onShortcut={this._handleShortcutPageDate}
              onOk={this._handleOK}
            />
          </div>
        </PickerMenuWrapper>
      );
    },

    _getDateString(value) {
      const nextValue = value || this.currentVal;
      let startDate = _.get(nextValue, '0');
      let endDate = _.get(nextValue, '1');

      if (startDate || endDate) {
        if (!startDate || startDate.isAfter(endDate)) {
          [startDate, endDate] = [endDate, startDate];
        }

        return `${startDate ? startDate.format(this.format) : this.format} ~ ${
          endDate ? endDate.format(this.format) : this.format
        }`;
      }

      return (
        this.$slots.placeholder ||
        this.placeholder ||
        `${this.format} ~ ${this.format}`
      );
    },

    _getHoverRange(date) {
      if (!this.hoverRange) {
        return [];
      }

      let hoverRangeFunc = this.hoverRange;
      if (this.hoverRange === 'week') {
        hoverRangeFunc = this._getWeekHoverRange;
      }

      if (hoverRangeFunc === 'month') {
        hoverRangeFunc = this._getMonthHoverRange;
      }

      if (typeof hoverRangeFunc !== 'function') {
        return [];
      }

      const hoverValues = hoverRangeFunc(date.clone());
      const isHoverRangeValid =
        hoverValues instanceof Array && hoverValues.length === 2;

      if (!isHoverRangeValid) {
        return [];
      }

      if (hoverValues[0].isAfter(hoverValues[1])) {
        hoverValues.reverse();
      }

      return hoverValues;
    },

    // hover range presets
    _getWeekHoverRange(date) {
      if (this.isoWeek) {
        // set to the first day of this week according to ISO 8601, 12:00 am
        return [date.clone().startOf('isoWeek'), date.clone().endOf('isoWeek')];
      }

      return [date.clone().startOf('week'), date.clone().endOf('week')];
    },

    _getMonthHoverRange(date) {
      return [date.clone().startOf('month'), date.clone().endOf('month')];
    },

    _disabledDate(date, values, type) {
      if (this.disabledDate) {
        return this.disabledDate(date, values, this.doneSelected, type);
      }

      return false;
    },

    _disabledByBetween(start, end, type) {
      const date = start.clone();
      const selectStartDate = this.selectVal[0]
        ? this.selectVal[0].clone()
        : null;
      const selectEndDate = this.selectVal[1]
        ? this.selectVal[1].clone()
        : null;
      const nextSelectValue = [selectStartDate, selectEndDate];

      // If the date is between the start and the end
      // the button is disabled
      while (start.isBefore(end) || start.isSame(end, 'day')) {
        if (
          this.disabledDate &&
          this.disabledDate(date, nextSelectValue, this.doneSelected, type)
        ) {
          return true;
        }

        start.add(1, 'd');
      }

      return false;
    },

    _disabledOkButton() {
      if (!this.selectVal[0] || !this.selectVal[1] || !this.doneSelected) {
        return true;
      }

      return this._disabledByBetween(
        this.selectVal[0].clone(),
        this.selectVal[1].clone(),
        DATE_RANGE_TYPES.TOOLBAR_BUTTON_OK
      );
    },

    _disabledShortcutButton(value) {
      if (!value[0] || !value[1]) {
        return true;
      }

      return this._disabledByBetween(
        value[0].clone(),
        value[1].clone(),
        DATE_RANGE_TYPES.TOOLBAR_SHORTCUT
      );
    },

    _setVal(value, event) {
      this.innerVal = value;

      this.$emit('change', value, event);

      if (findComponentUpward(this, 'FormItem', false)) {
        this.$parent.dispatch('change');
      }
    },

    _handleOK(event) {
      this._closePopper();

      this._setVal(this.selectVal, event);

      this.$emit('ok', this.selectVal, event);
    },

    _handleShortcutPageDate(date, close, event) {
      this._setVal(date, event);

      if (close !== false) {
        this._closePopper();
      }
    },

    _handleClean() {
      if (this.disabled) return;

      this.selectVal = [];

      this._setVal(null, event);
    },

    _handleChangeSelectValue(date) {
      let nextValue = [];
      let nextHoverValue = this._getHoverRange(date);

      if (this.doneSelected) {
        if (nextHoverValue.length) {
          nextValue = [nextHoverValue[0], nextHoverValue[1], date];
          nextHoverValue = [nextHoverValue[0], nextHoverValue[1], date];
        } else {
          nextValue = [date, undefined, date];
        }
      } else {
        if (nextHoverValue.length) {
          nextValue = [this.selectVal[0], this.selectVal[1]];
        } else {
          nextValue = [this.selectVal[0], date];
        }

        if (nextValue[0].isAfter(nextValue[1])) {
          nextValue.reverse();
        }

        nextValue[0] = setTimingMargin(nextValue[0]);
        nextValue[1] = setTimingMargin(nextValue[1]);

        this.calendarDate = getCalendarDate(nextValue);
      }

      this.doneSelected = !this.doneSelected;
      this.selectVal = nextValue;
      this.hoverVal = nextHoverValue;

      this.$nextTick(() => {
        if (this.oneTap && !this.doneSelected) {
          this._handleChangeSelectValue(date);
        }

        this.$emit('select', date);
      });
    },

    _handleMouseMoveSelectValue(date) {
      if (this.currentHoverDate && date.isSame(this.currentHoverDate, 'day')) {
        return;
      }

      let nextHoverValue = this._getHoverRange(date);

      if (this.doneSelected && !_.isUndefined(this.hoverRange)) {
        this.currentHoverDate = date;
        this.hoverVal = nextHoverValue;

        return;
      } else if (this.doneSelected) {
        return;
      }

      let nextValue = this.selectVal;

      if (!nextHoverValue.length) {
        nextValue[1] = date;
      } else if (this.hoverVal) {
        nextValue = [
          nextHoverValue[0].isBefore(this.hoverVal[0])
            ? nextHoverValue[0]
            : this.hoverVal[0],
          nextHoverValue[1].isAfter(this.hoverVal[1])
            ? nextHoverValue[1]
            : this.hoverVal[1],
        ];
      }

      // If `nextValue[0]` is greater than `nextValue[1]` then reverse order
      if (nextValue[0].isAfter(nextValue[1])) {
        nextValue.reverse();
      }

      this.currentHoverDate = date;
      this.selectVal = [...nextValue];
    },

    _handleChangeCalendarDate(index, date) {
      this.calendarDate.splice(index, 1, date);
    },

    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
