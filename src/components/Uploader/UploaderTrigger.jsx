import VueTypes from 'vue-types';
import prefix, { defaultClassPrefix } from 'utils/prefix';

import Button from 'components/Button';
import { splitDataByComponent } from 'utils/split';

const CLASS_PREFIX = 'uploader-trigger';

export default {
  name: 'UploaderTrigger',

  props: {
    name: VueTypes.string,
    multiple: VueTypes.bool.def(false),
    disabled: VueTypes.bool.def(false),
    accept: VueTypes.string,
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
    componentClass: VueTypes.oneOfType([VueTypes.string, VueTypes.object]).def(
      Button
    ),
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
  },

  render() {
    const Component = this.componentClass;
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

    return (
      <div class={this.classes} onClick={this._handleClick}>
        <input
          type="file"
          name={this.name}
          multiple={this.multiple}
          disabled={this.disabled}
          accept={this.accept}
          ref="input"
          onInput={this._handleInput}
        />
        {this.$slots.default || (
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

    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
