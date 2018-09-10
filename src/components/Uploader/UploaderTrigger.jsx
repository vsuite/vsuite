import VueTypes from 'vue-types';
import prefix, { defaultClassPrefix } from 'utils/prefix';
import { cloneElement } from 'utils/node';
import { splitDataByComponent } from 'utils/split';

import Button from 'components/Button';

const CLASS_PREFIX = 'uploader-trigger';

export default {
  name: 'UploaderTrigger',

  props: {
    name: VueTypes.string,
    multiple: VueTypes.bool.def(false),
    disabled: VueTypes.bool.def(false),
    accept: VueTypes.string,
    drag: VueTypes.bool.def(false),
    paste: VueTypes.bool.def(false),
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
    componentClass: VueTypes.oneOfType([VueTypes.string, VueTypes.object]).def(
      Button
    ),
  },

  data() {
    return { isDragging: false };
  },

  computed: {
    classes() {
      return [
        this.classPrefix,
        {
          [this._addPrefix('disabled')]: this.disabled,
        },
      ];
    },
    triggerClasses() {
      return [
        this._addPrefix('btn'),
        { [this._addPrefix('btn-dragging')]: this.isDragging },
      ];
    },
  },

  render() {
    const Component = this.componentClass;
    const divData = {
      class: this.classes,
      on: { click: this._handleClick },
    };
    const cmpData = splitDataByComponent(
      {
        splitProps: {
          ...this.$attrs,
          disabled: this.disabled,
        },
        on: { click: this._handleClick },
      },
      Component
    );
    const iptData = splitDataByComponent(
      {
        splitProps: {
          type: 'file',
          name: this.name,
          multiple: this.multiple,
          disabled: this.disabled,
          accept: this.accept,
        },
        on: { input: this._handleInput },
        ref: 'input',
      },
      'input'
    );
    const child = this.$slots.default && this.$slots.default[0];
    let listeners = { click: this._handleClick };

    if (this.drag) {
      listeners.drop = this._handleDrop;
      listeners.dragover = this._handleDragover;
      listeners.dragleave = this._handleDragleave;
    }

    if (this.paste) {
      divData.on.paste = this._handlePaste;
    }

    const trigger =
      child &&
      cloneElement(child, {
        class: this.triggerClasses,
        on: listeners,
      });

    return (
      <div {...divData}>
        <input {...iptData} />
        {trigger || (
          <Component {...cmpData}>{this.$t('_.Uploader.upload')}</Component>
        )}
      </div>
    );
  },

  methods: {
    _cleanInput() {
      const input =
        (this.$refs.input && this.$refs.input.$el) || this.$refs.input;

      input.value = '';
    },

    _handleClick(event) {
      event.stopPropagation();

      const input =
        (this.$refs.input && this.$refs.input.$el) || this.$refs.input;

      input && input.click();
    },

    _handleInput(event) {
      this.$emit('change', event);
    },

    _handleDrop(event) {
      event.preventDefault();

      this.$emit('change', event);
    },

    _handleDragover(event) {
      event.preventDefault();

      this.isDragging = true;
    },

    _handleDragleave(event) {
      event.preventDefault();

      this.isDragging = false;
    },

    _handlePaste(event) {
      this.$emit('change', event);
    },

    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
