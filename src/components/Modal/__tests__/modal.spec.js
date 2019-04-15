import { mount } from '@vue/test-utils';

import Modal from 'components/Modal';

import manager from '../manager';
import ExtendedTransitionStub from '../../../../test/stub/ExtendedTransitionStub';

describe('Modal Component', () => {
  it('should be added to ModalManager', done => {
    const $wrapper = mount(
      {
        data() {
          return { visible: false };
        },

        render() {
          return (
            <Modal visible={this.visible} title="Title">
              content
            </Modal>
          );
        },
      },
      { stubs: { transition: ExtendedTransitionStub } }
    );
    const $transitions = $wrapper.findAll({ name: 'ExtendedTransitionStub' });
    const triggerEnterHooks = () => {
      for (let i = 0, len = $transitions.length; i < len; i++) {
        $transitions.at(i).vm.triggerEnterHooks();
      }
    };
    const triggerLeaveHooks = () => {
      for (let i = 0, len = $transitions.length; i < len; i++) {
        $transitions.at(i).vm.triggerLeaveHooks();
      }
    };

    $wrapper.setData({ visible: true });

    $wrapper.vm.$nextTick(() => {
      triggerEnterHooks();
      expect(manager.stack.length).toBe(1);

      $wrapper.setData({ visible: false });

      $wrapper.vm.$nextTick(() => {
        triggerLeaveHooks();
        expect(manager.stack.length).toBe(0);

        done();
      });
    });
  });
});
