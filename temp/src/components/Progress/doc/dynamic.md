### 动态展示

<!--start-code-->

```vue
<template>
  <div>
    <ButtonGroup>
      <Button @click="_handleMinus">-</Button>
      <Button @click="_handleAdd">+</Button>
    </ButtonGroup>

    <hr />

    <ProgressLine :percent="percent" :strokeColor="color" :status="status" />

    <div style="width: 120px; margin: 10px;">
      <ProgressCircle
        :percent="percent"
        :strokeColor="color"
        :status="status"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return { percent: 30 };
  },

  computed: {
    status() {
      return this.percent === 100 ? 'success' : null;
    },
    color() {
      return this.percent === 100 ? '#52c41a' : '#3385ff';
    },
  },

  methods: {
    _handleMinus() {
      this.percent = this.percent - 10 <= 0 ? 0 : this.percent - 10;
    },

    _handleAdd() {
      this.percent = this.percent + 10 >= 100 ? 100 : this.percent + 10;
    },
  },
};
</script>
```

<!--end-code-->
