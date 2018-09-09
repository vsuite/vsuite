import VueTypes from 'vue-types';
import _ from 'lodash';
import prefix, { defaultClassPrefix } from 'utils/prefix';
import { splitDataByComponent } from 'utils/split';

import UploaderTrigger from './UploaderTrigger.jsx';
import UploaderFileItem from './UploaderFileItem.jsx';

import { STATUS, TYPES } from './constant';

const CLASS_PREFIX = 'uploader';
const FILE_TYPE = {
  key: VueTypes.oneOfType([VueTypes.string, VueTypes.number]),
  name: VueTypes.string,
  rawFile: File,
  status: VueTypes.oneOf([
    STATUS.START,
    STATUS.UPLOAD,
    STATUS.FAILED,
    STATUS.SUCCESS,
  ]),
  progress: VueTypes.number,
};
const guid = (num = 8) =>
  (Math.random() * 1e18)
    .toString(36)
    .slice(0, num)
    .toUpperCase();

export default {
  name: 'Uploader',

  model: {
    prop: 'fileList',
    event: 'change',
  },

  props: {
    name: VueTypes.string.def('file'),
    type: VueTypes.oneOf([TYPES.TEXT, TYPES.PIC, TYPES.PIC_TEXT]).def(
      TYPES.TEXT
    ),
    action: VueTypes.string,
    headers: VueTypes.object.def({}),
    accept: VueTypes.string,
    timeout: VueTypes.number,
    autoUpload: VueTypes.bool,
    maxFileSize: VueTypes.number.def(5 << 20),
    value: VueTypes.arrayOf(VueTypes.shape(FILE_TYPE)),
    defaultValue: VueTypes.arrayOf(VueTypes.shape(FILE_TYPE)).def([]),
    data: VueTypes.object,
    multiple: VueTypes.bool.def(false),
    drag: VueTypes.bool.def(false),
    paste: VueTypes.bool.def(false),
    disabled: VueTypes.bool.def(false),
    disabledFileItem: VueTypes.bool.def(false),
    withCredentials: VueTypes.bool.def(false),
    showUploadList: VueTypes.bool,
    beforeUpload: Function,
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
        {this.type === TYPES.PIC
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
          ref: 'trigger',
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
              key={file.key || index}
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

    _handleTriggerChange(event) {
      const fileList = this.currentVal;
      const files = event.target.files || [];
      const newFileList = [];

      Array.from(files).forEach(file => {
        newFileList.push({
          key: guid(),
          name: file.name,
          rawFile: file,
          status: STATUS.START,
        });
      });

      /* eslint-disable */
      const nextFileList = [...fileList, ...newFileList];
    },

    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
