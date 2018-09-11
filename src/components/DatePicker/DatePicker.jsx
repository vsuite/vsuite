import VueTypes from 'vue-types';
import _ from 'lodash';
import moment from 'moment';
import popperMixin from 'mixins/popper';
import prefix, { defaultClassPrefix } from 'utils/prefix';
import { splitDataByComponent } from 'utils/split';

import {
  PickerToggle,
  PickerMenuWrapper,
  getToggleWrapperClassName,
} from 'components/_picker';
import Calendar, {
  CALENDAR_STATE,
  shouldOnlyTime,
  disabledTime,
} from 'components/_calendar';

import DatePickerToolbar from './DatePickerToolbar.jsx';

const CLASS_PREFIX = 'picker';
const Range = {
  label: VueTypes.any,
  value: VueTypes.any,
  closeOverlay: VueTypes.bool,
};

export default {
  name: 'DatePicker',

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
    value: VueTypes.any,
    defaultValue: VueTypes.any,
    appearance: VueTypes.oneOf(['default', 'subtle']).def('default'),
    ranges: VueTypes.arrayOf(VueTypes.shape(Range)),
    calendarDefaultDate: VueTypes.any,
    placeholder: VueTypes.string,
    format: VueTypes.string.def('YYYY-MM-DD'),
    inline: VueTypes.bool.def(false),
    disabled: VueTypes.bool.def(false),
    block: VueTypes.bool.def(false),
    cleanable: VueTypes.bool,
    isoWeek: VueTypes.bool.def(false),
    limitStartYear: VueTypes.number.def(5),
    limitEndYear: VueTypes.number.def(5),
    disabledDate: Function,
    disabledHours: Function,
    disabledMinutes: Function,
    disabledSeconds: Function,
    hideHours: Function,
    hideMinutes: Function,
    hideSeconds: Function,
    menuClassName: VueTypes.string,
    menuStyle: VueTypes.object,
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
  },

  data() {
    const initVal = _.isUndefined(this.value) ? this.defaultValue : this.value;

    return {
      innerVal: initVal,
      pageDate: initVal || this.calendarDefaultDate || moment(),
      calendarState: null,
    };
  },

  computed: {
    currentVal() {
      return _.isUndefined(this.value) ? this.innerVal : this.value;
    },
  },

  watch: {
    currentVal(nextVal, preVal) {
      if (nextVal && !nextVal.isSame(preVal, 'day')) {
        this.pageDate = nextVal;
      }
    },
  },

  render(h) {
    if (this.inline) {
      return (
        <div class={[this.classPrefix, this._addPrefix('date-inline')]}>
          {this._renderCalendar(h)}
        </div>
      );
    }
    const hasValue = !!this.currentVal;
    const referenceData = {
      class: getToggleWrapperClassName(
        'date',
        this._addPrefix,
        this,
        hasValue,
        {
          [this._addPrefix('date-only-time')]: shouldOnlyTime(this.format),
        }
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
        class: [this._addPrefix('date-menu'), this.menuClassName],
        style: this.menuStyle,
      });

      return (
        <PickerMenuWrapper {...popperData}>
          <div ref="menuContainer">
            {this._renderCalendar(h)}
            <DatePickerToolbar
              ranges={this.ranges}
              pageDate={this.pageDate}
              disabledHandle={this._disabledToolbarHandle}
              onShortcut={this._handleShortcutPageDate}
              onOk={this._handleOk}
            />
          </div>
        </PickerMenuWrapper>
      );
    },

    _renderCalendar() {
      return (
        <Calendar
          disabledDate={this.disabledDate}
          disabledHours={this.disabledHours}
          disabledMinutes={this.disabledMinutes}
          disabledSeconds={this.disabledSeconds}
          hideHours={this.hideHours}
          hideMinutes={this.hideMinutes}
          hideSeconds={this.hideSeconds}
          limitStartYear={this.limitStartYear}
          limitEndYear={this.limitEndYear}
          format={this.format}
          isoWeek={this.isoWeek}
          calendarState={this.calendarState}
          pageDate={this.pageDate}
          onMove-forward={this._handleMoveForward}
          onMove-backward={this._handleMoveBackward}
          onSelect={this._handleSelect}
          onToggle-month-dropdown={this._handleToggleMonthDropdown}
          onToggle-time-dropdown={this._handleToggleTimeDropdown}
          onChange-page-date={this._handleChangePageDate}
          onChange-page-time={this._handleChangePageTime}
          calendarRef={ref => {
            this.calendar = ref;
          }}
        />
      );
    },

    _getDateString() {
      const value = this.currentVal;

      return value
        ? value.format(this.format)
        : this.$slots.placeholder || this.placeholder || this.format;
    },

    _disabledToolbarHandle(date) {
      const allowDate = this.disabledDate ? this.disabledDate(date) : false;
      const allowTime = disabledTime(this, date);

      return allowDate || allowTime;
    },

    _setVal(date, event) {
      this.innerVal = date;

      this.$emit('change', date, event);
    },

    _setPageDate(date, event) {
      this.pageDate = date;

      this.$emit('change-calendar-date', date, event);
    },

    _handleOk(event) {
      this._closePopper();

      this._setVal(this.pageDate, event);

      this.$emit('ok', this.pageDate, event);
    },

    _handleClean(event) {
      if (this.disabled) return;

      this.pageDate = moment();

      this._setVal(null, event);
    },

    _handleShortcutPageDate(date, close, event) {
      this._setVal(date, event);

      if (close !== false) {
        this._closePopper();
      }
    },

    _handleSelect(date, event) {
      this._setPageDate(date, event);

      this.$emit('select', date, event);
    },

    _handleMoveBackward(date, event) {
      this._setPageDate(date, event);

      this.$emit('next-month', date, event);
    },

    _handleMoveForward(date, event) {
      this._setPageDate(date, event);

      this.$emit('prev-month', date, event);
    },

    _handleToggleMonthDropdown(event) {
      let toggle;

      if (this.calendarState === CALENDAR_STATE.MONTH) {
        toggle = false;

        this.calendarState = null;
      } else {
        toggle = true;

        this.calendarState = CALENDAR_STATE.MONTH;
      }

      this.$emit('toggle-month-dropdown', toggle, event);
    },

    _handleToggleTimeDropdown(event) {
      let toggle;

      if (this.calendarState === CALENDAR_STATE.TIME) {
        toggle = false;

        this.calendarState = null;
      } else {
        toggle = true;

        this.calendarState = CALENDAR_STATE.TIME;
      }

      this.$emit('toggle-time-dropdown', toggle, event);
    },

    _handleChangePageDate(date, event) {
      this.calendarState = null;

      this._setPageDate(date, event);
    },

    _handleChangePageTime(date, event) {
      this.calendarState = null;

      this._setPageDate(date, event);
    },

    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
