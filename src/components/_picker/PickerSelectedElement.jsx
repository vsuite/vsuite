import VueTypes from 'vue-types';
import _ from 'lodash';
import { vueToString } from 'utils/node';

export default {
  name: 'PickerSelectedElement',

  props: {
    selectedItems: VueTypes.arrayOf(VueTypes.any).def([]),
    prefix: VueTypes.func,
    valueKey: VueTypes.string.def('value'),
    labelKey: VueTypes.string.def('label'),
    childrenKey: VueTypes.string.def('children'),
    countable: VueTypes.bool.def(false),
    cascade: VueTypes.bool.def(false),
  },

  render() {
    const count = this.selectedItems.length;
    let title = '';

    if (count) {
      title = this.selectedItems
        .map(item => {
          let label = _.get(item, this.labelKey);

          if (typeof label === 'string' || typeof label === 'number') {
            return label;
          } else if (_.isObject(label)) {
            return vueToString(label).join('');
          }

          return '';
        })
        .join(', ');
    }

    return (
      <span class={this.prefix('value-list--wrapper')}>
        <span class={this.prefix('value-list')} title={title}>
          {this.selectedItems.map((item, index) => {
            let checkAll =
              this.cascade && (item.checkAll || _.get(item, this.childrenKey));

            return (
              <span
                class={this.prefix('value-item--wrapper')}
                key={_.get(item, this.valueKey)}
              >
                <span class={this.prefix('value-item')}>
                  {_.get(item, this.labelKey)}
                  {checkAll ? ` (${this.$t('_.CheckPicker.checkAll')}})` : ''}
                </span>
                {index === count - 1 ? null : (
                  <span class={this.prefix('value-separator')}>,</span>
                )}
              </span>
            );
          })}
        </span>
        {this.countable ? (
          <span class={this.prefix('value-count')} title={count}>
            {count > 99 ? '99+' : count}
          </span>
        ) : null}
      </span>
    );
  },
};
