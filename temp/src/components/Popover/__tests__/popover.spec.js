import { mount } from '@vue/test-utils';

import Popover from 'components/Popover';

describe('Popover component', () => {
  // click trigger
  it('should emit event', done => {
    jest.useFakeTimers();

    const $wrapper = mount({
      render() {
        return (
          <Popover title="This is a tooltip.">
            <button>click</button>
            <template slot="content">
              <p>This is a default Popover </p>
              <p>Content</p>
            </template>
          </Popover>
        );
      },
    });
    const $popover = $wrapper.find(Popover);
    const $reference = $popover.find({ ref: 'reference' });

    // show popover
    $reference.trigger('click');
    jest.runAllTimers();

    $wrapper.vm.$nextTick(() => {
      expect($popover.emitted('show')).toBeTruthy();
      expect($popover.emitted('visible-change')).toBeTruthy();

      // hide popover
      $reference.trigger('click');
      jest.runAllTimers();

      $wrapper.vm.$nextTick(() => {
        expect($popover.emitted('hide')).toBeTruthy();
        expect($popover.emitted('visible-change')).toBeTruthy();

        done();
      });
    });
  });

  // show, hide methods
  it('can call show and hide methods', done => {
    jest.useFakeTimers();

    const $wrapper = mount({
      render() {
        return (
          <Popover title="This is a tooltip.">
            <button>click</button>
            <template slot="content">
              <p>This is a default Popover </p>
              <p>Content</p>
            </template>
          </Popover>
        );
      },
    });
    const $popover = $wrapper.find(Popover);

    // show popover
    $popover.vm.show();
    jest.runAllTimers();

    $wrapper.vm.$nextTick(() => {
      expect($popover.emitted('show')).toBeTruthy();
      expect($popover.emitted('visible-change')).toBeTruthy();

      // hide popover
      $popover.vm.hide();
      jest.runAllTimers();

      $wrapper.vm.$nextTick(() => {
        expect($popover.emitted('hide')).toBeTruthy();
        expect($popover.emitted('visible-change')).toBeTruthy();

        done();
      });
    });
  });
});
