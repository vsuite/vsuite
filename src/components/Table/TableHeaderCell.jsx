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
    columnKey: VueTypes.string,
    columnMinWidth: VueTypes.number,
    columnMaxWidth: VueTypes.number,
    resizable: VueTypes.bool.def(false),
    fixed: VueTypes.oneOfType([VueTypes.bool, VueTypes.string]).def(false),
    sortType: VueTypes.oneOf(['asc', 'desc', '']).def(''),
    sortable: VueTypes.bool.def(false),
    filterable: VueTypes.bool.def(false),
    filters: VueTypes.array.def([]),
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),

    // onSort
    // onFilter
  },

  data() {
    return { columnWidth: this.width };
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

      const data = {
        on: {
          'column-resize-start': this._handleColumnResizeStart,
          'column-resize-move': this._handleColumnResizeMove,
          'column-resize-end': this._handleColumnResizeEnd,
        },
      };

      return (
        <TableResizer
          columnWidth={this.columnWidth}
          columnMinWidth={this.columnMinWidth}
          columnMaxWidth={this.columnMaxWidth}
          columnLeft={this.left}
          columnFixed={this.fixed}
          height={this.height ? this.height - 1 : undefined}
          {...data}
        />
      );
    },

    _handleColumnResizeStart() {
      this.$emit(
        'column-resize-start',
        this.columnWidth,
        this.left,
        !!this.fixed
      );
    },

    _handleColumnResizeMove(...args) {
      this.$emit('column-resize-move', ...args);
    },

    _handleColumnResizeEnd(columnWidth, cursorDelta) {
      this.columnWidth = columnWidth;

      this.$emit(
        'column-resize-end',
        columnWidth,
        cursorDelta,
        this.columnKey,
        this.index
      );
      this.$emit('resize', columnWidth, this.columnKey);
    },

    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
