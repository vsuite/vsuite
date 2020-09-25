import { mount, createWrapper } from '@vue/test-utils';

import Notification from 'components/Notification';

describe('Notification Component', () => {
  // render one notification
  it('should be removed after a few seconds', done => {
    jest.useFakeTimers();

    const $wrapper = mount({
      render() {
        return <button onClick={this._handleOpen}>click</button>;
      },

      methods: {
        _handleOpen() {
          Notification.open('Title', 'Description');
        },
      },
    });
    const $btn = $wrapper.find('button');

    $btn.trigger('click');

    $wrapper.vm.$nextTick(() => {
      expect(
        createWrapper(document.body).findAll('.vs-notification-notice-wrapper')
      ).toHaveLength(1);

      jest.runAllTimers();

      $wrapper.vm.$nextTick(() => {
        expect(
          createWrapper(document.body).findAll(
            '.vs-notification-notice-wrapper'
          )
        ).toHaveLength(0);

        done();
      });
    });
  });

  // render multiple notices
  it('should have many notices', done => {
    jest.useFakeTimers();

    const $wrapper = mount({
      render() {
        return <button onClick={this._handleOpen}>click</button>;
      },

      methods: {
        _handleOpen() {
          Notification.open('Title', 'Description');
        },
      },
    });
    const $btn = $wrapper.find('button');

    $btn.trigger('click');
    $btn.trigger('click');

    $wrapper.vm.$nextTick(() => {
      expect(
        createWrapper(document.body).findAll('.vs-notification-notice-wrapper')
      ).toHaveLength(2);

      jest.runAllTimers();

      $wrapper.vm.$nextTick(() => {
        expect(
          createWrapper(document.body).findAll(
            '.vs-notification-notice-wrapper'
          )
        ).toHaveLength(0);

        done();
      });
    });
  });

  // custom
  it('should not be removed after calling remove function', done => {
    jest.useFakeTimers();

    const $wrapper = mount({
      render() {
        return <button onClick={this._handleOpen}>click</button>;
      },

      methods: {
        _handleOpen() {
          this.instancer = Notification.open('Title', 'Message', 0);
        },

        remove() {
          this.instancer && this.instancer.remove();
        },
      },
    });
    const $btn = $wrapper.find('button');

    $btn.trigger('click');

    jest.runAllTimers();

    $wrapper.vm.$nextTick(() => {
      expect(
        createWrapper(document.body).findAll('.vs-notification-notice-wrapper')
      ).toHaveLength(1);

      jest.runAllTimers();

      $wrapper.vm.remove();

      $wrapper.vm.$nextTick(() => {
        expect(
          createWrapper(document.body).findAll(
            '.vs-notification-notice-wrapper'
          )
        ).toHaveLength(0);

        done();
      });
    });
  });
});
