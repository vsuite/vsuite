import { on, off, getContainer, addClass, removeClass } from 'dom-lib';

class ModalManager {
  constructor() {
    this.stack = []; // modal instance stack
    this.counter = {
      resize: 0,
      keydown: 0,
    };
    this.listener = {
      resize: null,
      keydown: null,
    };
  }

  add = vm => {
    if (!vm) return;

    this.counter.resize++;
    if (vm.keyboard) this.counter.keydown++;

    const container = getContainer(vm.container, document.body);
    const classes = [...vm.containerClasses];

    classes.forEach(addClass.bind(null, container));

    this.stack.push({
      vm,
      container,
      classes,
      keyboard: !!vm.keyboard,
      resize: true,
    });

    this._subscribeEvents();
  };

  remove = vm => {
    const index = this.stack.map(x => x.vm).indexOf(vm);
    const { container, classes, keyboard, resize } = this.stack[index];

    if (index === -1) return;
    if (resize) this.counter.resize--;
    if (keyboard) this.counter.keydown--;

    classes.forEach(removeClass.bind(null, container));

    this.stack.splice(index, 1);

    this._unsubscribeEvents();
  };

  _subscribeEvents = () => {
    // window resize
    if (!this.listener.resize && this.counter.resize > 0) {
      this.listener.resize = on(window, 'resize', this._handleWindowResize);
    }

    // document keydown
    if (!this.listener.keydown && this.counter.keydown > 0) {
      this.listener.keydown = on(
        document,
        'keydown',
        this._handleDocumentKeydown
      );
    }
  };

  _unsubscribeEvents = () => {
    // window resize
    if (this.counter.resize <= 0) {
      this.listener.resize && off(window, 'resize', this._handleWindowResize);
      this.listener.resize = null;
    }

    // document keydown
    if (this.counter.keydown <= 0) {
      this.listener.keydown &&
        off(document, 'keydown', this._handleDocumentKeydown);
      this.listener.keydown = null;
    }
  };

  _handleWindowResize = () => {
    this.stack.forEach(x => x.vm._computedStyles());
  };

  _handleDocumentKeydown = event => {
    const { vm, keyboard } = this.stack[this.stack.length - 1];

    if (keyboard && event.keyCode === 27) {
      vm._handleClose();
    }
  };
}

export default new ModalManager();
