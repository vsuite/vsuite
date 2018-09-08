import VueTypes from 'vue-types';
import _ from 'lodash';
import prefix, { defaultClassPrefix } from 'utils/prefix';
import { splitDataByComponent } from 'utils/split';

import UploaderTrigger from './UploaderTrigger.jsx';
import UploaderFileItem from './UploaderFileItem.jsx';

const CLASS_PREFIX = 'uploader';
const FILE_TYPE = {
  name: VueTypes.string,
  fileKey: VueTypes.oneOfType([VueTypes.string, VueTypes.number]),
  blobFile: File,
  status: VueTypes.oneOf(['init', 'uploading', 'error', 'finish']),
  progress: VueTypes.number,
};

export default {
  name: 'Uploader',

  model: {
    prop: 'fileList',
    event: 'change',
  },

  props: {
    name: VueTypes.string.def('file'),
    type: VueTypes.oneOf(['text', 'picture', 'picture-text']).def('text'),
    action: VueTypes.string,
    accept: VueTypes.string,
    timeout: VueTypes.number,
    autoUpload: VueTypes.bool,
    maxFileSize: VueTypes.number.def(5 << 20),
    value: VueTypes.arrayOf(VueTypes.shape(FILE_TYPE)),
    defaultValue: VueTypes.arrayOf(VueTypes.shape(FILE_TYPE)).def([]),
    data: VueTypes.object,
    multiple: VueTypes.bool.def(false),
    disabled: VueTypes.bool.def(false),
    disabledFileItem: VueTypes.bool.def(false),
    withCredentials: VueTypes.bool.def(false),
    shouldUpload: Function,
    shouldQueueUpdate: Function,
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
    toggleComponentClass: VueTypes.oneOfType([
      VueTypes.string,
      VueTypes.object,
    ]),
    // change, upload, reupload, preview, error, success, progress, remove
  },

  data() {
    return {
      innerVal: _.isUndefined(this.value)
        ? this.defaultValue
        : this.value || [],
    };
  },

  computed: {
    currentVal() {
      return _.isUndefined(this.value) ? this.innerVal : this.value || [];
    },
  },

  render(h) {
    return (
      <div class={[this.classPrefix, this._addPrefix(this.type)]}>
        {this.type === 'picture'
          ? [this._renderFileItems(h), this._renderTrigger(h)]
          : [this._renderTrigger(h), this._renderFileItems(h)]}
      </div>
    );
  },

  methods: {
    _renderTrigger() {
      const data = splitDataByComponent(
        {
          key: 'trigger',
          splitProps: {
            ...this.$attrs,
            name: this.name,
            multiple: this.multiple,
            disabled: this.disabled,
            accept: this.accept,
            componentClass: this.toggleComponentClass,
          },
          on: { change: this._handleTriggerChange },
        },
        UploaderTrigger
      );

      return <UploaderTrigger {...data}>{this.$slots.default}</UploaderTrigger>;
    },

    _renderFileItems() {
      return (
        <div key="items" class={this._addPrefix('file-items')}>
          {this.currentVal.map((file, index) => (
            <UploaderFileItem
              key={file.fileKey || index}
              file={file}
              type={this.type}
              disabled={this.disabledFileItem}
              maxFileSize={this.maxFileSize}
              onPreview={this._handlePreview}
              onReupload={this._handleReupload}
              onCancel={this._handleRemove}
            />
          ))}
        </div>
      );
    },

    _handlePreview() {},

    _handleReupload() {},

    _handleRemove() {},

    _handleTriggerChange() {},

    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
