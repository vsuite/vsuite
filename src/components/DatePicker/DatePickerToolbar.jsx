import VueTypes from 'vue-types';
import moment from 'moment';
import prefix, { defaultClassPrefix } from 'utils/prefix';

const CLASS_PREFIX = 'picker-toolbar';
const Range = {
  label: VueTypes.any,
  value: VueTypes.any,
  closeOverlay: VueTypes.bool,
};

export default {
  name: 'DatePickerToolbar',

  props: {
    pageDate: VueTypes.object,
    ranges: VueTypes.arrayOf(VueTypes.shape(Range)).def([
      {
        label: 'today',
        value: moment(),
        closeOverlay: true,
      },
      {
        label: 'yesterday',
        value: moment().add(-1, 'd'),
        closeOverlay: true,
      },
    ]),
    disabledHandle: Function,
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
    // ok, shortcut
  },

  render(h) {
    return (
      <div class={this.classPrefix}>
        <div class={this._addPrefix('ranges')}>
          {this.ranges.map((item, index) => {
            const value =
              typeof item.value === 'function'
                ? item.value(this.pageDate)
                : item.value;
            const disabled = this.disabledHandle && this.disabledHandle(value);
            const itemClassName = [
              this._addPrefix('option'),
              {
                [this._addPrefix('option-disabled')]: disabled,
              },
            ];

            return (
              <a
                key={index}
                class={itemClassName}
                role="button"
                tabindex="-1"
                onClick={event => {
                  !disabled &&
                    this.$emit('shortcut', value, item.closeOverlay, event);
                }}
              >
                {this.$t(`_.Calendar.${item.label}`) || item.label}
              </a>
            );
          })}
        </div>
        {this._renderOkButton(h)}
      </div>
    );
  },

  methods: {
    _renderOkButton() {
      const disabled =
        this.disabledHandle && this.disabledHandle(this.pageDate);
      const btnData = {
        class: [
          this._addPrefix('right-btn-ok'),
          {
            [this._addPrefix('btn-disabled')]: disabled,
          },
        ],
        on: disabled ? {} : { click: this._handleOk },
      };

      return (
        <div class={this._addPrefix('right')}>
          <button {...btnData}>{this.$t('_.Calendar.ok')}</button>
        </div>
      );
    },

    _handleOk(event) {
      this.$emit('ok', event);
    },

    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
