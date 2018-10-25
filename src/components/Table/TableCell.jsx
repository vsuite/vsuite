import VueTypes from 'vue-types';
import prefix, { defaultClassPrefix } from 'utils/prefix';

import { LAYER_WIDTH } from './constants';

const CLASS_PREFIX = 'table-cell';

export default {
  name: 'TableCell',

  props: {
    index: VueTypes.number,
    align: VueTypes.oneOf(['left', 'center', 'right']).def('left'),
    dataKey: VueTypes.string,
    left: VueTypes.number,
    width: VueTypes.number,
    height: VueTypes.number.def(36),
    firstColumn: VueTypes.bool.def(false),
    lastColumn: VueTypes.bool.def(false),
    hasChildren: VueTypes.bool.def(false),
    rowKey: VueTypes.oneOfType([VueTypes.string, VueTypes.number]),
    rowIndex: VueTypes.number,
    rowData: VueTypes.object,
    layer: VueTypes.number,
    isHeaderCell: VueTypes.bool.def(false),
    wordWrap: VueTypes.bool.def(false),
    removed: VueTypes.bool.def(false),
    contentStyle: VueTypes.object.def(() => ({})),
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),

    renderCell: Function,
  },

  computed: {
    classes() {
      return [
        this.classPrefix,
        {
          [this._addPrefix('first')]: this.firstColumn,
          [this._addPrefix('last')]: this.lastColumn,
        },
      ];
    },
  },

  render(h) {
    if (this.removed) return null;

    const layerWidth = this.layer * LAYER_WIDTH;
    const nextWidth =
      !this.isHeaderCell && this.firstColumn
        ? this.width - layerWidth
        : this.width;
    const nextHeight = this.height;

    const children = this.$slots.default;

    const styles = {
      width: `${nextWidth}px`,
      height: `${nextHeight}px`,
      zIndex: this.layer,
      left:
        (!this.isHeaderCell && this.firstColumn
          ? this.left + layerWidth
          : this.left) + 'px',
    };

    const contentStyles = {
      width: nextWidth,
      height: nextHeight,
      textAlign: this.align,
      ...this.contentStyle,
    };

    return (
      <div class={this.classes} style={styles}>
        {this.wordWrap ? (
          <div class={this._addPrefix('content')} style={contentStyles}>
            <div class={this._addPrefix('wrap')}>
              {this._renderExpandIcon(h)}
              {this.renderCell ? this.renderCell(h, children) : children}
            </div>
          </div>
        ) : (
          <div class={this._addPrefix('content')} style={contentStyles}>
            {this._renderExpandIcon(h)}
            {this.renderCell ? this.renderCell(h, children) : children}
          </div>
        )}
      </div>
    );
  },

  methods: {
    // TODO: expand icon
    _renderExpandIcon(h) {
      return null;
    },

    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
