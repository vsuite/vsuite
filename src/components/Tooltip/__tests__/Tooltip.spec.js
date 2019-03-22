import { mount } from '@vue/test-utils';

import Tooltip from 'components/Tooltip';

describe('Tooltip component', () => {
  // click trigger
  it('should emit event', done => {
    jest.useFakeTimers();

    const $wrapper = mount({
      render() {
        return (
          <Tooltip trigger="click" title="demo text">
            <button>demo</button>
          </Tooltip>
        );
      },
    });
    const $tooltip = $wrapper.find(Tooltip);
    const $reference = $tooltip.find({ ref: 'reference' });

    // show tooltip
    $reference.trigger('click');
    jest.runAllTimers();

    $wrapper.vm.$nextTick(() => {
      expect($tooltip.emitted('show')).toBeTruthy();
      expect($tooltip.emitted('visible-change')).toBeTruthy();

      // hide tooltip
      $reference.trigger('click');
      jest.runAllTimers();

      $wrapper.vm.$nextTick(() => {
        expect($tooltip.emitted('hide')).toBeTruthy();
        expect($tooltip.emitted('visible-change')).toBeTruthy();

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
          <Tooltip trigger="click" title="demo text">
            <button>demo</button>
          </Tooltip>
        );
      },
    });
    const $tooltip = $wrapper.find(Tooltip);

    // show tooltip
    $tooltip.vm.show();
    jest.runAllTimers();

    $wrapper.vm.$nextTick(() => {
      expect($tooltip.emitted('show')).toBeTruthy();
      expect($tooltip.emitted('visible-change')).toBeTruthy();

      // hide tooltip
      $tooltip.vm.hide();
      jest.runAllTimers();

      $wrapper.vm.$nextTick(() => {
        expect($tooltip.emitted('hide')).toBeTruthy();
        expect($tooltip.emitted('visible-change')).toBeTruthy();

        done();
      });
    });
  });
});
