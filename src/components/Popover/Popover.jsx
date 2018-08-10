import VueTypes from 'vue-types';
import _ from 'lodash';
import Popper from 'popper.js';
import prefix, { defaultClassPrefix } from 'utils/prefix';
import { addStyle, getAttr } from 'shares/dom';
import { transferDom } from 'directives';
import { directive as clickOutside } from 'v-click-outside-x';

const TRIGGERS = ['click', 'right-click', 'hover', 'focus', 'active'];
const CLASS_PREFIX = 'popover';

function validTrigger(val) {
  let list = val;

  if (_.isString(val)) {
    list = [val];
  }

  if (!_.isArray(list)) return false;

  return list.every(v => ~TRIGGERS.indexOf(v));
}

export default {
  name: 'Popover',

  model: {
    prop: 'visible',
    event: 'change',
  },

  props: {
    visible: {
      type: Boolean,
      default: undefined,
    },
    defaultVisible: VueTypes.bool.def(false),
    placement: VueTypes.oneOf(Popper.placements).def('auto'),
    trigger: VueTypes.custom(validTrigger).def('hover'),
    delay: VueTypes.number.def(100),
    delayShow: VueTypes.number,
    delayHide: VueTypes.number,

    title: VueTypes.string,
    content: VueTypes.string,
    full: VueTypes.bool.def(false),
    transfer: VueTypes.bool.def(function() {
      return this.$VSUITE.transfer || false;
    }),

    // popper
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
  },

  directives: { clickOutside, transferDom },

  data() {
    return {
      innerVal: this.defaultVisible || false,
    };
  },

  computed: {
    classes() {
      return [
        this.classPrefix,
        {
          [this._addPrefix('full')]: this.full,
        },
      ];
    },
    currentVal() {
      return typeof this.visible === 'undefined' ? this.innerVal : this.visible;
    },
    triggerList() {
      return _.isString(this.trigger) ? [this.trigger] : this.trigger;
    },
  },

  // FIXME: check dynamic change the title property
  watch: {
    currentVal(val) {
      if (val) this._updatePopper();

      const content = this.$refs.content;
      const placement = getAttr(content, 'x-placement');

      if (!val && content) {
        if (~placement.indexOf('top')) {
          addStyle(content, { top: '2px' });
        }

        if (~placement.indexOf('bottom')) {
          addStyle(content, { top: '-2px' });
        }

        if (~placement.indexOf('right')) {
          addStyle(content, { left: '-2px' });
        }

        if (~placement.indexOf('left')) {
          addStyle(content, { left: '2px' });
        }
      }

      this.$emit(val ? 'show' : 'hide');
      this.$emit('change', val);
    },
    title() {
      this._updatePopper();
    },
  },

  mounted() {
    if (this.currentVal) this._updatePopper();
  },

  updated() {
    this.$nextTick(() => this._updatePopper());
  },

  beforeDestroy() {
    if (this.popperJS) {
      this.popperJS.destroy();
    }
  },

  render() {
    // const tooltipData = {
    //   class: this.classes,
    //   directives: [{ name: 'click-outside', value: this._handleClickOutside }],
    //   on: {},
    //   ref: 'container',
    // };
    // const referenceData = {
    //   class: this._addPrefix('rel'),
    //   on: {},
    //   ref: 'reference',
    // };
    // const contentData = {
    //   class: this.contentClasses,
    //   style: {},
    //   directives: [
    //     { name: 'show', value: this.currentVal },
    //     { name: 'transfer-dom' },
    //   ],
    //   attrs: {
    //     'data-transfer': `${this.transfer}`,
    //   },
    //   ref: 'content',
    // };
    // const arrowData = {
    //   class: this._addPrefix('arrow'),
    //   ref: 'arrow',
    // };
    // if (this.maxWidth) {
    //   contentData.style.maxWidth = `${this.maxWidth}px`;
    // }
    //
    // if (~this.triggerList.indexOf('click')) {
    //   referenceData.on.click = this._handleClick;
    // }
    //
    // if (~this.triggerList.indexOf('right-click')) {
    //   referenceData.on.contextmenu = this._handleRightClick;
    // }
    //
    // if (~this.triggerList.indexOf('active')) {
    //   referenceData.on.mousedown = this._handleMouseDown;
    // }
    //
    // if (~this.triggerList.indexOf('hover')) {
    //   tooltipData.on.mouseenter = this._handleMouseEnter;
    //   tooltipData.on.mouseleave = this._handleMouseLeave;
    // }
    //
    // if (~this.triggerList.indexOf('focus')) {
    //   tooltipData.on['!focus'] = this._handleFocus;
    //   tooltipData.on['!blur'] = this._handleBlur;
    // }

    return (
      <div>
        <div>{this.$slots.default}</div>
        <transition name="popover-fade">
          <div class={this.classes}>
            <div class="arrow" />
            {this.$slots.title ||
              (this.title ? (
                <h3 class={this._addPrefix('title')}>{this.title}</h3>
              ) : null)}
            <div class={this._addPrefix('content')}>
              {this.$slots.content || this.content}
            </div>
          </div>
        </transition>
      </div>
    );
  },

  methods: {
    _handleClickOutside() {
      this._handleDelayHide(() => (this.innerVal = false));
    },

    _handleClick() {
      if (this.innerVal) {
        this._handleDelayHide(() => (this.innerVal = false));
      } else {
        this._handleDelayShow(() => (this.innerVal = true));
      }
    },

    _handleRightClick(e) {
      e.preventDefault();

      if (this.innerVal) {
        this._handleDelayHide(() => (this.innerVal = false));
      } else {
        this._handleDelayShow(() => (this.innerVal = true));
      }

      return false;
    },

    _handleMouseDown() {
      this._handleDelayShow(() => (this.innerVal = true));
    },

    _handleMouseEnter(e) {
      e.stopPropagation();

      this._handleDelayShow(() => (this.innerVal = true));
    },

    _handleMouseLeave(e) {
      e.stopPropagation();

      this._handleDelayHide(() => (this.innerVal = false));
    },

    _handleFocus() {
      this._handleDelayShow(() => (this.innerVal = true));
    },

    _handleBlur() {
      this._handleDelayHide(() => (this.innerVal = false));
    },

    _handleDelayShow(cb) {
      const delay = this.delayShow || this.delay || 100;

      if (this.delayShowTimer) clearTimeout(this.delayShowTimer);
      if (this.delayHideTimer) clearTimeout(this.delayHideTimer);

      this.delayShowTimer = setTimeout(cb, delay);
    },

    _handleDelayHide(cb) {
      const delay = this.delayHide || this.delay || 100;

      if (this.delayShowTimer) clearTimeout(this.delayShowTimer);
      if (this.delayHideTimer) clearTimeout(this.delayHideTimer);

      this.delayHideTimer = setTimeout(cb, delay);
    },

    _createPopper() {
      const reference = this.$refs.reference;
      const popper = this.$refs.content;
      const arrow = this.$refs.arrow;

      if (!reference || !popper) return;

      this.popperJS = new Popper(reference, popper, {
        placement: this.placement,
        onCreate: this._handleCreate,
        // onUpdate: this._handleUpdate,
        modifiers: {
          arrow: {
            element: arrow,
          },
        },
      });
    },

    _updatePopper() {
      this.popperJS ? this.popperJS.update() : this._createPopper();
    },

    _handleCreate() {
      this.$nextTick(this._updatePopper);
    },

    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
