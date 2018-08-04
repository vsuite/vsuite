<template>
  <div class="vs-content-paragraph">
    <p
      class="vs-content-paragraph-p"
      v-for="(p, index) in paragraphs"
      :key="index"
      :style="{ width: p }"
    ></p>
  </div>
</template>

<script>
import VueTypes from 'vue-types';

const mocks = ['97%', '100%', '94%', '90%', '98%', '95%', '98%', '40%'];

export default {
  name: 'vs-content-paragraph',

  props: {
    size: VueTypes.oneOf(['small', 'middle', 'large']).def('middle'),
    height: VueTypes.number,
  },

  computed: {
    paragraphs() {
      let len = 0;

      if (this.height) {
        len = Math.ceil(this.height / 24);
      }

      if (this.size === 'middle') {
        len = 8;
      } else if (this.size === 'small') {
        len = 4;
      } else if (this.size === 'large') {
        len = 16;
      }

      return new Array(len).fill('100%').map((x, i) => mocks[i % mocks.length]);
    },
  },
};
</script>

<style lang="less" scoped>
.vs-content-paragraph {
  .vs-content-paragraph-p {
    margin-top: 10px;
    height: 14px;
    background-color: rgb(205, 205, 205);
  }
}
</style>
