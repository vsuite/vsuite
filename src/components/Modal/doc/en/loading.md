### Loading

<!--start-code-->

```vue
<template>
  <div>
    <ButtonToolbar>
      <Button @click="_handleOpen">Open</Button>
    </ButtonToolbar>

    <Modal
      v-model="visible"
      :loading="true"
      title="Modal Title"
      @ok="_handleOk"
    >
      <vs-content-paragraph size="small" />
    </Modal>
  </div>
</template>

<script>
export default {
  data() {
    return { visible: false };
  },

  methods: {
    _handleOpen() {
      this.visible = true;
    },

    _handleOk() {
      setTimeout(() => (this.visible = false), 2000);
    },
  },
};
</script>
```

<!--end-code-->
