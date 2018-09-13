import VueTypes from 'vue-types';
import SafeAnchor from 'components/SafeAnchor';
import Icon from 'components/Icon';
import invariant from 'utils/invariant';
import prefix, { defaultClassPrefix } from 'utils/prefix';
import { splitDataByComponent } from 'utils/split';
import { PAGINATION_ICON_NAMES, SIZES } from 'utils/constant';

import PaginationButton from './PaginationButton.jsx';

const CLASS_PREFIX = 'pagination';

export default {
  name: 'Pagination',

  props: {
    size: VueTypes.oneOf(SIZES),
    activePage: VueTypes.number.def(1),
    pages: VueTypes.number.def(1),
    maxButtons: VueTypes.number,
    boundaryLinks: VueTypes.bool.def(false),
    ellipsis: VueTypes.bool.def(false),
    first: VueTypes.bool.def(false),
    last: VueTypes.bool.def(false),
    prev: VueTypes.bool.def(false),
    next: VueTypes.bool.def(false),
    disabled: VueTypes.oneOfType([VueTypes.bool, VueTypes.func]).def(false),
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
    buttonComponentClass: VueTypes.oneOfType([
      VueTypes.string,
      VueTypes.object,
    ]).def(SafeAnchor),
  },

  computed: {
    hasEllipsis() {
      invariant.not(
        this.ellipsis && this.$slots.ellipsis,
        'You cannot use property ellipsis and slot ellipsis at same time. Please pick one way.'
      );

      return this.ellipsis || this.$slots.ellipsis;
    },

    classes() {
      return [
        this.classPrefix,
        {
          [this._addPrefix(this.size)]: this.size,
        },
      ];
    },
  },

  render(h) {
    return (
      <ul class={this.classes}>
        {this._renderFirst(h)}
        {this._renderPrev(h)}
        {this._renderPageButtons(h)}
        {this._renderNext(h)}
        {this._renderLast(h)}
      </ul>
    );
  },

  methods: {
    _renderItem(h, data, children) {
      let disabled = data.splitProps.disabled || false;

      if (typeof this.disabled === 'function') {
        disabled = this.disabled(data.splitProps.eventKey);
      } else if (typeof this.disabled === 'boolean') {
        disabled = this.disabled;
      }

      if (!data.splitProps.disabled) {
        data.on = {
          ...(data.on || {}),
          select: this._handleSelect,
        };
      }

      data.splitProps = {
        ...(data.splitProps || {}),
        disabled,
        componentClass: this.buttonComponentClass,
      };
      children =
        typeof children === 'string' || children.length ? children : [children];

      const btnData = splitDataByComponent(data, PaginationButton);

      return <PaginationButton {...btnData}>{children}</PaginationButton>;
    },

    _renderFirst(h) {
      if (!this.first && !this.$slots.first) return null;

      invariant.not(
        this.first && this.$slots.first,
        'You cannot use property first and slot first at same time. Please pick one way.'
      );

      return this._renderItem(
        h,
        {
          key: 'first',
          splitProps: {
            eventKey: 1,
            disabled: this.activePage === 1,
          },
        },
        <span aria-label="First" title={this.$t('_.Pagination.first')}>
          {this.first && <Icon icon={PAGINATION_ICON_NAMES.first} />}
          {this.$slots.first}
        </span>
      );
    },

    _renderPrev(h) {
      if (!this.prev && !this.$slots.prev) return null;

      invariant.not(
        this.prev && this.$slots.prev,
        'You cannot use property prev and slot prev at same time. Please pick one way.'
      );

      return this._renderItem(
        h,
        {
          key: 'prev',
          splitProps: {
            eventKey: this.activePage - 1,
            disabled: this.activePage === 1,
          },
        },
        <span aria-label="Previous" title={this.$t('_.Pagination.prev')}>
          {this.prev && <Icon icon={PAGINATION_ICON_NAMES.prev} />}
          {this.$slots.prev}
        </span>
      );
    },

    _renderPageButtons(h) {
      const pageButtons = [];
      let startPage;
      let endPage;
      let hasHiddenPagesAfter;

      if (this.maxButtons) {
        let hiddenPagesBefore =
          this.activePage - parseInt(this.maxButtons / 2, 10);

        startPage = hiddenPagesBefore > 1 ? hiddenPagesBefore : 1;
        hasHiddenPagesAfter = startPage + this.maxButtons <= this.pages;

        if (!hasHiddenPagesAfter) {
          endPage = this.pages;
          startPage = this.pages - this.maxButtons + 1;
          if (startPage < 1) {
            startPage = 1;
          }
        } else {
          endPage = startPage + this.maxButtons - 1;
        }
      } else {
        startPage = 1;
        endPage = this.pages;
      }

      for (let pagenumber = startPage; pagenumber <= endPage; pagenumber += 1) {
        pageButtons.push(
          this._renderItem(
            h,
            {
              key: pagenumber,
              splitProps: {
                eventKey: pagenumber,
                active: pagenumber === this.activePage,
              },
            },
            `${pagenumber}`
          )
        );
      }

      if (this.boundaryLinks && this.hasEllipsis && startPage !== 1) {
        pageButtons.unshift(
          this._renderItem(
            h,
            {
              key: 'ellipsisFirst',
              splitProps: { disabled: true },
            },
            <span aria-label="More">
              {this.ellipsis && <Icon icon={PAGINATION_ICON_NAMES.more} />}
              {this.$slots.ellipsis}
            </span>
          )
        );

        pageButtons.unshift(
          this._renderItem(
            h,
            {
              key: 1,
              splitProps: { eventKey: 1 },
            },
            '1'
          )
        );
      }

      if (this.maxButtons && hasHiddenPagesAfter && this.hasEllipsis) {
        pageButtons.push(
          this._renderItem(
            h,
            {
              key: 'ellipsis',
              splitProps: { disabled: true },
            },
            <span aria-label="More">
              {this.ellipsis && <Icon icon={PAGINATION_ICON_NAMES.more} />}
              {this.$slots.ellipsis}
            </span>
          )
        );

        if (this.boundaryLinks && endPage !== this.pages) {
          pageButtons.push(
            this._renderItem(
              h,
              {
                key: this.pages,
                splitProps: {
                  eventKey: this.pages,
                  disabled: false,
                },
              },
              `${this.pages}`
            )
          );
        }
      }

      return pageButtons;
    },

    _renderNext(h) {
      if (!this.next && !this.$slots.next) return null;

      invariant.not(
        this.next && this.$slots.next,
        'You cannot use property next and slot next at same time. Please pick one way.'
      );

      return this._renderItem(
        h,
        {
          key: 'next',
          splitProps: {
            eventKey: this.activePage + 1,
            disabled: this.activePage >= this.pages,
          },
        },
        <span aria-label="Next" title={this.$t('_.Pagination.next')}>
          {this.next && <Icon icon={PAGINATION_ICON_NAMES.next} />}
          {this.$slots.next}
        </span>
      );
    },

    _renderLast(h) {
      if (!this.last && !this.$slots.last) return null;

      invariant.not(
        this.last && this.$slots.last,
        'You cannot use property last and slot last at same time. Please pick one way.'
      );

      return this._renderItem(
        h,
        {
          key: 'last',
          splitProps: {
            eventKey: this.pages,
            disabled: this.activePage >= this.pages,
          },
        },
        <span aria-label="Last" title={this.$t('_.Pagination.last')}>
          {this.last && <Icon icon={PAGINATION_ICON_NAMES.last} />}
          {this.$slots.last}
        </span>
      );
    },

    _handleSelect(eventKey, event) {
      this.$emit('select', eventKey, event);
    },

    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
