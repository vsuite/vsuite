import VueTypes from 'vue-types';
import _ from 'lodash';
import prefix, { defaultClassPrefix } from 'utils/prefix';

import { STATUS, TYPES } from './constant';

const CLASS_PREFIX = 'uploader-file-item';
const getSize = size => {
  const K = 1024;
  const M = 1024 * 1024;
  const G = 1024 * 1024 * 1024;

  if (size > G) {
    return `${(size / M).toFixed(2)}GB`;
  }

  if (size > M) {
    return `${(size / M).toFixed(2)}MB`;
  }

  if (size > K) {
    return `${(size / K).toFixed(2)}KB`;
  }
  return `${size}B`;
};

export default {
  name: 'UploaderFileItem',

  props: {
    file: VueTypes.shape({
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
    }),
    type: VueTypes.oneOf([TYPES.TEXT, TYPES.PIC, TYPES.PIC_TEXT]).def(
      TYPES.TEXT
    ),
    disabled: VueTypes.bool.def(false),
    maxFileSize: VueTypes.number.def(5 << 20), // 5MB
    classPrefix: VueTypes.string.def(defaultClassPrefix(CLASS_PREFIX)),
  },

  data() {
    return {
      previewImage: null,
    };
  },

  mounted() {
    this._getThumbnail(img => (this.previewImage = img));
  },

  computed: {
    classes() {
      return [
        this.classPrefix,
        this._addPrefix(this.type),
        {
          [this._addPrefix('has-error')]: this.file.status === STATUS.FAILED,
          [this._addPrefix('disabled')]: this.disabled,
        },
      ];
    },
  },

  render(h) {
    if (this.type === TYPES.PIC) {
      return (
        <div class={this.classes}>
          {this._renderLoading(h)}
          {this._renderPreview(h)}
          {this._renderErrorStatus(h)}
          {this._renderRemoveButton(h)}
        </div>
      );
    }

    if (this.type === TYPES.PIC_TEXT) {
      return (
        <div class={this.classes}>
          {this._renderLoading(h)}
          {this._renderPreview(h)}
          {this._renderFilePanel(h)}
          {this._renderProgressBar(h)}
          {this._renderRemoveButton(h)}
        </div>
      );
    }

    return (
      <div class={this.classes}>
        {this._renderLoading(h)}
        {this._renderFilePanel(h)}
        {this._renderProgressBar(h)}
        {this._renderRemoveButton(h)}
      </div>
    );
  },

  methods: {
    _renderFilePanel(h) {
      return (
        <div class={this._addPrefix('panel')}>
          <div class={this._addPrefix('content')}>
            <a
              class={this._addPrefix('title')}
              role="presentation"
              onClick={this._handlePreview}
            >
              {this.file.name}
            </a>
            {this._renderErrorStatus(h)}
            {this._renderFileSize(h)}
          </div>
        </div>
      );
    },

    _renderFileSize() {
      const { status, rawFile } = this.file;

      if (status !== STATUS.FAILED && rawFile && rawFile.size) {
        return (
          <span class={this._addPrefix('size')}>{getSize(rawFile.size)}</span>
        );
      }

      return null;
    },

    _renderErrorStatus() {
      const { status } = this.file;

      if (status === STATUS.FAILED) {
        return (
          <div class={this._addPrefix('status')}>
            {this.$t('_.Uploader.error')}
            <a role="button" tabindex="-1" onClick={this._handleReupload}>
              <i class={this._addPrefix('icon-reupload')} />
            </a>
          </div>
        );
      }

      return null;
    },

    _renderRemoveButton() {
      return (
        <a
          class={this._addPrefix('btn-remove')}
          role="button"
          tabindex="-1"
          aria-label="Remove"
          onClick={this._handleRemove}
        >
          <span aria-hidden="true">×</span>
        </a>
      );
    },

    _renderLoading() {
      const { status } = this.file;
      const uploading = status === STATUS.UPLOAD;
      const classes = [
        this._addPrefix('icon-wrapper'),
        {
          [this._addPrefix('icon-loading')]: uploading,
        },
      ];

      return (
        <div class={classes}>
          <i class={this._addPrefix('icon')} />
        </div>
      );
    },

    _renderPreview() {
      const { rawFile } = this.file;

      if (this.previewImage && rawFile) {
        return (
          <div class={this._addPrefix('preview')}>
            <img
              role="presentation"
              src={this.previewImage}
              alt={rawFile.name}
              onClick={this._handlePreview}
            />
          </div>
        );
      }

      return null;
    },

    _renderProgressBar() {
      const { progress = 0, status } = this.file;
      const show = !this.disabled && status === STATUS.UPLOAD;
      const visibility = show ? 'visible' : 'hidden';
      const wrapStyle = {
        visibility,
      };
      const progressbarStyle = {
        width: `${progress}%`,
      };

      return (
        <div style={wrapStyle} class={this._addPrefix('progress')}>
          <div
            style={progressbarStyle}
            class={this._addPrefix('progress-bar')}
          />
        </div>
      );
    },

    _handlePreview(event) {
      if (this.disabled) return;

      this.$emit('preview', this.file, event);
    },

    _handleReupload(event) {
      if (this.disabled) return;

      this.$emit('reupload', this.file, event);
    },

    _handleRemove(event) {
      if (this.disabled) return;

      this.$emit('remove', this.file.key, event);
    },

    _getThumbnail(cb) {
      if (!~[TYPES.PIC, TYPES.PIC_TEXT].indexOf(this.type)) {
        return;
      }

      if (
        !this.file.rawFile ||
        _.get(this.file, 'rawFile.size') > this.maxFileSize
      ) {
        return;
      }

      const reader = new FileReader();

      reader.onloadend = () => cb && cb(reader.result);
      reader.readAsDataURL(this.file.rawFile);
    },

    _addPrefix(cls) {
      return prefix(this.classPrefix, cls);
    },
  },
};
