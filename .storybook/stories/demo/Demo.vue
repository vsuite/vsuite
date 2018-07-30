<template>
  <div class="vs-demo">
    <h2 class="vs-demo-title">{{title}}</h2>
    <p class="vs-demo-desc">{{desc}}</p>
    <div class="vs-demo-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import VueTypes from 'vue-types';

export default {
  name: 'vs-demo',

  props: {
    title: VueTypes.string,
    desc: VueTypes.string,
  },
};
</script>

<style lang="less" scoped>
.vs-demo {
  margin: 15px;

  .vs-demo-title {
    font-size: 18px;
  }

  .vs-demo-desc {
    line-height: 26px;
  }

  .vs-demo-content {
    position: relative;
    margin: 18px 0;
    padding: 18px 18px 28px;
    border: 1px dashed #f1f1f1;
    transition: border-color 0.3s linear;

    &:hover {
      border: 1px dashed #34c3ff;
    }
  }
}
</style>
