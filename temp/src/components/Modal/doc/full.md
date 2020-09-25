### 全屏

<!--start-code-->

```vue
<template>
  <div>
    <ButtonToolbar>
      <Button @click="_handleOpen">Open</Button>
    </ButtonToolbar>

    <Modal v-model="visible" full title="Modal Title">
      <vs-content-paragraph size="small" />
    </Modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
    };
  },

  methods: {
    _handleOpen() {
      this.visible = true;
    },
  },
};
</script>
```

<!--end-code-->
