import Vue from 'vue';

import LoadingBar, { STATUS } from './LoadingBar.jsx';

const loadingBarStore = {
  instance: null,
  color: '#2196f3',
  failColor: '#f44336',
  height: 4,
  progress: true,
  timer: null,
};

function createLoadingBarInstance() {
  const props = {
    color: loadingBarStore.color,
    failColor: loadingBarStore.failedColor,
    height: loadingBarStore.height,
    progress: loadingBarStore.progress,
  };

  if (loadingBarStore.instance) return loadingBarStore.instance;

  const wrapper = new Vue({
    render: h => {
      const loadingBarData = {
        props: props || {},
      };

      return <LoadingBar {...loadingBarData} />;
    },
  });
  const component = wrapper.$mount();

  document.body.appendChild(component.$el);

  const loadingBar = wrapper.$children[0];

  loadingBarStore.instance = {
    component: loadingBar,
    update(options) {
      if ('percent' in options) {
        loadingBar.percent = options.percent;
      }

      if ('status' in options) {
        loadingBar.status = options.status;
      }

      if ('show' in options) {
        loadingBar.show = options.show;
      }
    },
    destroy() {
      document.body.removeChild(component.$el);
    },
  };

  return loadingBarStore.instance;
}

function update(options) {
  const instance = createLoadingBarInstance();

  instance.update(options);
}

function hide() {
  setTimeout(() => {
    update({ show: false });

    setTimeout(() => {
      update({ percent: loadingBarStore.progress ? 0 : 100 });
    }, 200);
  }, 800);
}

function clearTimer() {
  if (loadingBarStore.timer) {
    clearInterval(loadingBarStore.timer);
    loadingBarStore.timer = null;
  }
}

export default {
  start() {
    if (loadingBarStore.timer) return;

    let percent = loadingBarStore.progress ? 0 : 100;

    update({
      percent: percent,
      status: STATUS.LOADING,
      show: true,
    });

    if (loadingBarStore.progress) {
      loadingBarStore.timer = setInterval(() => {
        percent += 2.5;

        if (percent > 95) {
          clearTimer();
        }

        update({
          percent,
          status: STATUS.LOADING,
          show: true,
        });
      }, 200);
    }
  },

  update(percent) {
    clearTimer();

    update({
      percent: loadingBarStore.progress ? percent : 100,
      status: STATUS.LOADING,
      show: true,
    });
  },

  finish() {
    clearTimer();

    update({
      percent: 100,
      status: STATUS.LOADING,
      show: true,
    });

    hide();
  },

  error() {
    clearTimer();

    update({
      percent: 100,
      status: STATUS.ERROR,
      show: true,
    });

    hide();
  },

  config(options) {
    if ('color' in options) {
      loadingBarStore.color = options.color;
    }

    if ('failedColor' in options) {
      loadingBarStore.failedColor = options.failedColor;
    }

    if ('height' in options) {
      loadingBarStore.height = options.height;
    }

    if ('progress' in options) {
      loadingBarStore.progress = options.progress;
    }
  },

  destroy() {
    clearTimer();

    if (!loadingBarStore.instance) return;

    loadingBarStore.instance.destroy();

    loadingBarStore.instance = null;
  },
};
