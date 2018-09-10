import VueTypes from 'vue-types';
import moment from 'moment';
import prefix, { defaultClassPrefix } from 'utils/prefix';

const CLASS_PREFIX = 'calendar-header';

export default {
  name: 'CalendarHeader',

  props: {
    date: VueTypes.any.def(moment()),
    format: VueTypes.string,
    showMonth: VueTypes.bool.def(false),
    showDate: VueTypes.bool.def(false),
    showTime: VueTypes.bool.def(false),
    disabledBackward: VueTypes.bool.def(false),
    disabledForword: VueTypes.bool.def(false),
    disabledDate: Function,
    disabledTime: Function,
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
  },

  computed: {
    hasMonth() {
      return this.showDate || this.showMonth;
    },

    classes() {
      return [
        this.classPrefix,
        {
          [this._addPrefix('has-month')]: this.hasMonth,
          [this._addPrefix('has-time')]: this.showTime,
        },
      ];
    },

    dateTitleClasses() {
      return [
        this._addPrefix('title'),
        this._addPrefix('title-date'),
        {
          [this._addPrefix('error')]:
            this.disabledDate && this.disabledDate(this.date),
        },
      ];
    },

    timeTitleClasses() {
      return [
        this._addPrefix('title'),
        this._addPrefix('title-time'),
        {
          [this._addPrefix('error')]:
            this.disabledTime && this.disabledTime(this.date),
        },
      ];
    },

    backwardClasses() {
      return [
        this._addPrefix('backward'),
        {
          [this._addPrefix('btn-disabled')]: this.disabledBackward,
        },
      ];
    },

    forwardClasses() {
      return [
        this._addPrefix('forward'),
        {
          [this._addPrefix('btn-disabled')]: this.disabledForword,
        },
      ];
    },

    dateFormat() {
      if (this.showDate) return 'YYYY-MM-DD';
      else if (this.showMonth) return 'YYYY-MM';
      return 'YYYY';
    },

    timeFormat() {
      const timeFormat = [];

      if (!this.format) {
        return '';
      }

      if (/(H|h)/.test(this.format)) {
        timeFormat.push('HH');
      }

      if (/m/.test(this.format)) {
        timeFormat.push('mm');
      }

      if (/s/.test(this.format)) {
        timeFormat.push('ss');
      }

      return timeFormat.join(':');
    },
  },

  render() {
    const backwardData = {
      class: this.backwardClasses,
      attrs: {
        role: 'button',
        tabindex: '-1',
      },
      on: this.disabledBackward ? {} : { click: this._handleMoveBack },
    };
    const forwardData = {
      class: this.forwardClasses,
      attrs: {
        role: 'button',
        tabindex: '-1',
      },
      on: this.disabledForword ? {} : { click: this._handleMoveForward },
    };

    const monthToolbar = (
      <div class={this._addPrefix('month-toolbar')}>
        <i {...backwardData} />
        <span
          class={this.dateTitleClasses}
          role="button"
          tabIndex="-1"
          onClick={this._handleToggleMonthDropdown}
        >
          {this.date && this.date.format(this.dateFormat)}
        </span>
        <i {...forwardData} />
      </div>
    );

    return (
      <div class={this.classes}>
        {this.hasMonth && monthToolbar}
        {this.showTime && (
          <div class={this._addPrefix('time-toolbar')}>
            <span
              class={this.timeTitleClasses}
              role="button"
              tabindex="-1"
              onClick={this._handleToggleTimeDropdown}
            >
              {this.date && this.date.format(this.timeFormat)}
            </span>
          </div>
        )}
      </div>
    );
  },

  methods: {
    _handleMoveBack(event) {
      this.$emit('move-backward', event);
    },

    _handleMoveForward(event) {
      this.$emit('move-forward', event);
    },

    _handleToggleMonthDropdown(event) {
      this.$emit('toggle-month-dropdown', event);
    },

    _handleToggleTimeDropdown(event) {
      this.$emit('toggle-time-dropdown', event);
    },

    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
