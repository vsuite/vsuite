/* eslint-disable */
import Vue from 'vue';
import { SIZES, STATUS_TYPES } from 'utils/constant';

import Modal from './Modal.jsx';

const modalStore = {
  instance: null,
};

function createModalInstance(config) {}

function modal(config) {
  config = config || {};

  let instance = createModalInstance(config);

  // title: VueTypes.string,
  //   backdrop: VueTypes.oneOfType([
  //   VueTypes.bool,
  //   VueTypes.oneOf(['static']),
  // ]).def(true),
  // closable: VueTypes.bool,
  // overflow: VueTypes.bool,
  // keyboard: VueTypes.bool,
  // full: VueTypes.bool.def(false),
  // drag: VueTypes.bool.def(false),
  // loading: VueTypes.bool.def(false),
  // size: VueTypes.oneOf(SIZES).def('sm'),
  // header: VueTypes.bool,
  // footer: VueTypes.bool,
  // okText: VueTypes.string,
  // cancelText: VueTypes.string,
  // onOk
  // onCancel
}

export default {
  open(config) {
    modal(config);
  },
  success(config) {
    config.type = STATUS_TYPES.SUCCESS;

    modal(config);
  },
  error(config) {
    config.type = STATUS_TYPES.ERROR;

    modal(config);
  },
  info(config) {
    config.type = STATUS_TYPES.INFO;

    modal(config);
  },
  warning(config) {
    config.type = STATUS_TYPES.WARNING;

    modal(config);
  },
  warn(config) {
    config.type = STATUS_TYPES.WARN;

    modal(config);
  },
  remove() {},
};
