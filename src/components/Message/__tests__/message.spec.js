import { mount } from '@vue/test-utils';
import Message from 'components/Message';

describe('Message Component', () => {
  it('should emit close event', done => {
    jest.useFakeTimers();

    const $wrapper = mount(Message, { propsData: { closable: true } });

    $wrapper.find('button').trigger('click');

    jest.runAllTimers();

    $wrapper.vm.$nextTick(() => {
      expect($wrapper.emitted('close')).toBeTruthy();
      expect($wrapper.emitted('close')).toHaveLength(1);

      done();
    });
  });
});
