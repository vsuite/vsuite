import VueTypes from 'vue-types';
import moment from 'moment';
import prefix, { defaultClassPrefix } from 'utils/prefix';

import { setTimingMargin } from './utils';

const CLASS_PREFIX = 'picker-toolbar';
const Range = {
  label: VueTypes.any,
  value: VueTypes.any,
  closeOverlay: VueTypes.bool,
};

export default {
  name: 'DateRangePicker',

  props: {
    ranges: VueTypes.arrayOf(VueTypes.shape(Range)).def(() => {
      const date = moment();

      return [
        {
          label: 'today',
          value: [
            setTimingMargin(date.clone()),
            setTimingMargin(date.clone(), 'right'),
          ],
        },
        {
          label: 'yesterday',
          value: [
            setTimingMargin(date.clone().add(-1, 'd')),
            setTimingMargin(date.clone().add(-1, 'd'), 'right'),
          ],
        },
        {
          label: 'last7Days',
          value: [
            setTimingMargin(date.clone().subtract(6, 'days')),
            setTimingMargin(date.clone(), 'right'),
          ],
        },
      ];
    }),
    pageDate: VueTypes.any,
    selectValue: VueTypes.arrayOf(VueTypes.any),
    disabledOkButton: Function,
    disabledShortcutButton: Function,
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
  },

  computed: {
    disabledBtn() {
      return this.disabledOkButton && this.disabledOkButton(this.pageDate);
    },

    btnClasses() {
      return [
        this._addPrefix('right-btn-ok'),
        {
          [this._addPrefix('btn-disabled')]: this.disabledBtn,
        },
      ];
    },
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
            const disabled =
              this.disabledShortcutButton && this.disabledShortcutButton(value);
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
                onClick={event =>
                  !disabled &&
                  this.$emit('shortcut', value, item.closeOverlay, event)
                }
              >
                {this.$t(`_.DateRangePicker.${item.label}`) || item.label}
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
      return (
        <div class={this._addPrefix('right')}>
          <button class={this.btnClasses} onClick={this._handleOk}>
            {this.$t('_.Calendar.ok')}
          </button>
        </div>
      );
    },

    _handleOk(event) {
      if (this.disabledBtn) return;

      this.$emit('ok', event);
    },

    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
