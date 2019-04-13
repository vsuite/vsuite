### 动态的

<!--start-code-->

```vue
<template>
  <div>
    <ButtonToolbar>
      <Button @click="_handleOpen">Open</Button>
    </ButtonToolbar>

    <Modal v-model="visible" title="Modal Title">
      <div v-if="loading" style="text-align: center;">
        <Loader size="md" />
      </div>
      <Paragraph v-else size="small" />
    </Modal>
  </div>
</template>

<script>
export default {
  data() {
    return { visible: false, loading: true };
  },

  methods: {
    _handleOpen() {
      this.visible = true;
      this.loading = true;

      setTimeout(() => (this.loading = false), 2000);
    },
  },
};
</script>
```

<!--end-code-->
