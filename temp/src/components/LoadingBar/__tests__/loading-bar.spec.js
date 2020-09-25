import { mount, createWrapper } from '@vue/test-utils';

describe('LoadingBar Component', () => {
  it('should be created first and removed second.', done => {
    jest.useFakeTimers();

    const $wrapper = mount({
      render() {
        return (
          <div>
            <button class="show" onClick={() => this.$Loading.start()}>
              show
            </button>
            <button class="hide" onClick={() => this.$Loading.finish()}>
              show
            </button>
          </div>
        );
      },
    });
    const $showBtn = $wrapper.find('button.show');
    const $hideBtn = $wrapper.find('button.hide');

    $showBtn.trigger('click');

    jest.runAllTimers();

    $wrapper.vm.$nextTick(() => {
      expect(
        createWrapper(document.body)
          .find('.vs-loading-bar')
          .isVisible()
      ).toBe(true);

      $hideBtn.trigger('click');

      jest.runAllTimers();

      $wrapper.vm.$nextTick(() => {
        expect(
          createWrapper(document.body)
            .find('.vs-loading-bar')
            .isVisible()
        ).toBe(false);

        done();
      });
    });
  });
});
