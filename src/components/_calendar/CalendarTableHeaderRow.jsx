import VueTypes from 'vue-types';
import prefix, { defaultClassPrefix } from 'utils/prefix';

const CLASS_PREFIX = 'calendar-table';
const weekKeys = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
];

export default {
  name: 'CalendarTableHeaderRow',

  props: {
    isoWeek: VueTypes.bool.def(false),
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
  },

  render() {
    let items = weekKeys;

    if (this.isoWeek) {
      items = weekKeys.filter((v, k) => k > 0);
      items.push('sunday');
    }

    return (
      <div class={[this._addPrefix('row'), this._addPrefix('header-row')]}>
        {items.map(key => (
          <div key={key} class={this._addPrefix('cell')}>
            <span class={this._addPrefix('cell-content')}>
              {this.$t(`_.Calendar.${key}`)}
            </span>
          </div>
        ))}
      </div>
    );
  },

  methods: {
    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
