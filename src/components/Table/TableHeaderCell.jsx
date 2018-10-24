import VueTypes from 'vue-types';
import prefix, { defaultClassPrefix } from 'utils/prefix';
import { splitDataByComponent } from 'utils/split';

import TableCell from './TableCell.jsx';

const CLASS_PREFIX = 'table-cell-header';

export default {
  name: 'TableHeaderCell',

  props: {
    index: VueTypes.number,
    left: VueTypes.number,
    flex: VueTypes.number,
    width: VueTypes.number,
    height: VueTypes.number.def(36),
    fixed: VueTypes.bool.def(false),
    sortType: VueTypes.oneOf(['asc', 'desc', '']).def(''),
    sortable: VueTypes.bool.def(false),
    filterable: VueTypes.bool.def(false),
    filters: VueTypes.array.def([]),
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),

    // onSort
    // onResizeStart, onResizeEnd, onResize
    // onFilter
  },

  computed: {
    classes() {
      return [
        this.classPrefix,
        {
          [this._addPrefix('sortable')]: this.sortable,
          [this._addPrefix('filterable')]: this.filterable,
        },
      ];
    },
  },

  render(h) {
    const children = this.$slots.default;
    const cellData = splitDataByComponent(
      {
        props: {
          left: this.left,
          width: this.width,
          height: this.height,
          isHeaderCell: true,
        },
        splitProps: { ...this.$attrs },
      },
      TableCell
    );

    return (
      <div class={this.classes}>
        <TableCell {...cellData}>
          {children}
          {this._renderSortColumn(h)}
          {this._renderFilterColumn(h)}
        </TableCell>
        {this._renderResizeSpanner(h)}
      </div>
    );
  },

  methods: {
    _renderSortColumn() {},

    _renderFilterColumn() {},

    _renderResizeSpanner() {},

    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
