import Modal from './Modal.jsx';
import ModalInstance from './instance';

Modal.open = ModalInstance.open;
Modal.confirm = ModalInstance.confirm;
Modal.success = ModalInstance.success;
Modal.error = ModalInstance.error;
Modal.info = ModalInstance.info;
Modal.warning = ModalInstance.warning;
Modal.warn = ModalInstance.warn;
Modal.remove = ModalInstance.remove;

export default Modal;
