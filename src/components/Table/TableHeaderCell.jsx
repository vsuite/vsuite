import VueTypes from 'vue-types';
import prefix, { defaultClassPrefix } from 'utils/prefix';
import { splitDataByComponent } from 'utils/split';

import TableCell from './TableCell.jsx';
import TableResizer from './TableResizer.jsx';

const CLASS_PREFIX = 'table-cell-header';

export default {
  name: 'TableHeaderCell',

  props: {
    index: VueTypes.number,
    left: VueTypes.number,
    flex: VueTypes.number,
    width: VueTypes.number,
    height: VueTypes.number.def(36),
    resizable: VueTypes.bool.def(false),
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

  data() {
    return {
      columnWidth: this.width,
      initialEvent: null,
    };
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

    _renderResizeSpanner() {
      if (!this.resizable) return null;

      return (
        <TableResizer
          columnWidth={this.columnWidth}
          columnLeft={this.left}
          columnFixed={this.fixed}
          height={this.height ? this.height - 1 : undefined}
          initialEvent={this.initialEvent}
          onColumnResizeStart={this._handleColumnResizeStart}
          onColumnResizeMove={this._handleColumnResizeMove}
          onColumnResizeEnd={this._handleColumnResizeEnd}
        />
      );
    },

    _handleColumnResizeStart() {
      // column-resize-start
    },

    _handleColumnResizeMove(...args) {
      this.$emit('column-resize-move', ...args);
    },

    _handleColumnResizeEnd() {
      // column-resize-end
    },

    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
