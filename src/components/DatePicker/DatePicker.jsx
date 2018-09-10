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
import Calendar, { shouldOnlyTime } from 'components/_calendar';

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
    value: VueTypes.object,
    defaultValue: VueTypes.object,
    appearance: VueTypes.oneOf(['default', 'subtle']).def('default'),
    ranges: VueTypes.arrayOf(VueTypes.shape(Range)),
    calendarDefaultDate: VueTypes.object,
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
    // change, changeCalendarDate, toggleMonthDropdown, toggleTimeDropdown
    // select, previewMonth, nextMonth, ok
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
      if (!nextVal.isSame(preVal, 'day')) {
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
              disabledHandler={this._disabledToolbarHandler}
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
          onMoveForword={this._handleMoveForward}
          onMoveBackward={this._handleMoveBackward}
          onSelect={this._handleSelect}
          onToggleMonthDropdown={this._handleToggleMonthDropdown}
          onToggleTimeDropdown={this._handleToggleTimeDropdown}
          onChangePageDate={this._handleChangePageDate}
          onChangePageTime={this._handleChangePageTime}
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

    _disabledToolbarHandler() {},

    _handleOk() {},

    _handleClean() {},

    _handleShortcutPageDate() {},

    _handleSelect() {},

    _handleMoveBackward() {},

    _handleMoveForward() {},

    _handleToggleMonthDropdown() {},

    _handleToggleTimeDropdown() {},

    _handleChangePageDate() {},

    _handleChangePageTime() {},

    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
