import VueTypes from 'vue-types';
import _ from 'lodash';
import prefix, { defaultClassPrefix } from 'utils/prefix';
import { splitDataByComponent } from 'utils/split';

import UploaderTrigger from './UploaderTrigger.jsx';
import UploaderFileItem from './UploaderFileItem.jsx';

import { STATUS, TYPES } from './constant';
import upload from './upload';

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
    data: VueTypes.object.def({}),
    autoUpload: VueTypes.bool,
    maxFileSize: VueTypes.number.def(5 << 20),
    fileList: VueTypes.arrayOf(VueTypes.shape(FILE_TYPE)),
    defaultFileList: VueTypes.arrayOf(VueTypes.shape(FILE_TYPE)).def([]),
    multiple: VueTypes.bool.def(false),
    drag: VueTypes.bool.def(false),
    paste: VueTypes.bool.def(false),
    disabled: VueTypes.bool.def(false),
    disabledFileItem: VueTypes.bool.def(false),
    withCredentials: VueTypes.bool.def(false),
    showUploadList: VueTypes.bool,
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
      innerFileList: _.isUndefined(this.fileList)
        ? this.defaultFileList.map(this._createFile)
        : this.fileList || [],
    };
  },

  computed: {
    currentFileList() {
      return _.isUndefined(this.fileList)
        ? this.innerFileList
        : this.fileList || [];
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
          {this.currentFileList.map((file, index) => (
            <UploaderFileItem
              key={file.key || index}
              file={file}
              type={this.type}
              disabled={this.disabledFileItem}
              maxFileSize={this.maxFileSize}
              onPreview={this._handlePreview}
              onReupload={this._handleReupload}
              onRemove={this._handleRemove}
            />
          ))}
        </div>
      );
    },

    _createFile(file) {
      if (!file.rawFile) {
        file = { rawFile: file };
      }

      return {
        ...file,
        key: file.key || guid(),
        name: file.name || file.rawFile.name,
        status: file.status || STATUS.START,
        progress: file.progress || 0,
      };
    },

    _cleanInput() {
      this.$refs.trigger && this.$refs.trigger._cleanInput();
    },

    _uploadFile(file) {
      const xhr = upload({
        url: this.action,
        name: this.name,
        file,
        data: this.data,
        headers: this.headers,
        withCredentials: this.withCredentials,
        timeout: this.timeout,
        onSuccess: this._uploadFileSucceed.bind(this, file),
        onError: this._uploadFileFailed.bind(this, file),
        onProgress: this._uploadFileProgress.bind(this, file),
      });

      this.xhrMap = this.xhrMap || {};
      this.xhrMap[file.key] = xhr;

      this._setFileVal({
        ...file,
        status: STATUS.UPLOAD,
      });

      this.$emit('upload', file);
    },

    _uploadFileSucceed(file, response, event) {
      const nextFile = {
        ...file,
        status: STATUS.SUCCESS,
        progress: 100,
      };

      this._setFileVal(nextFile);

      this.$nextTick(() => this.$emit('success', response, nextFile, event));
    },

    _uploadFileFailed(file, status, event) {
      const nextFile = {
        ...file,
        status: STATUS.FAILED,
      };

      this._setFileVal(nextFile);

      this.$nextTick(() => this.$emit('error', status, nextFile, event));
    },

    _uploadFileProgress(file, percent, event) {
      const nextFile = {
        ...file,
        status: STATUS.UPLOAD,
        progress: percent,
      };

      this._setFileVal(nextFile);

      this.$nextTick(() => this.$emit('progress', percent, nextFile, event));
    },

    _setVal(fileList, event) {
      this.innerFileList = fileList;

      this.$emit('change', fileList, event);
    },

    _setFileVal(file) {
      const newFileList = this.currentFileList.map(x => {
        if (x.key === file.key) return file;

        return x;
      });

      this._setVal(newFileList);
    },

    _handleTriggerChange(event) {
      const fileList = this.currentFileList;
      const files = event.target.files || [];
      const newFileList = [];

      Array.from(files).forEach(file => {
        newFileList.push({
          key: guid(),
          name: file.name,
          rawFile: file,
          status: STATUS.START,
          progress: 0,
        });
      });

      const nextFileList = [...fileList, ...newFileList];

      this._cleanInput();

      if (
        this.shouldQueueUpdate &&
        this.shouldQueueUpdate(nextFileList, newFileList) === false
      ) {
        return;
      }

      this.$nextTick(() => this.autoUpload && this._handleUpload());

      this._setVal(nextFileList, event);
    },

    // ajax upload files
    _handleUpload(fileList) {
      fileList = fileList || this.currentFileList;

      fileList.forEach(file => {
        if (this.shouldUpload && this.shouldUpload(file) === false) {
          return;
        }

        if (file.status === STATUS.START) {
          this._uploadFile(file);
        }
      });
    },

    _handlePreview(file, event) {
      this.$emit('preview', file, event);
    },

    _handleReupload(file) {
      this._uploadFile(file);
    },

    _handleRemove(key, event) {
      if (this.xhrMap[key] && this.xhrMap[key].readyState !== 4) {
        this.xhrMap[key].abort();

        delete this.xhrMap[key];
      }

      let file;
      const newFileList = this.currentFileList.filter(f => {
        if (f.key === key) {
          file = f;

          return false;
        }

        return true;
      });

      this.$emit('remove', file);

      this._setVal(newFileList, event);
    },

    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },

    upload(files) {},
  },
};
