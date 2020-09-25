### Backdrop

When set to true, the Modal will display the background when it is opened. Clicking on the background will close the Modal. If you do not want to close the Modal, set it to 'static'.

<!--start-code-->

```vue
<template>
  <div>
    <ButtonToolbar>
      <Button @click="_handleOpen(true)">true</Button>
      <Button @click="_handleOpen(false)">false</Button>
      <Button @click="_handleOpen('static')">static</Button>
    </ButtonToolbar>

    <Modal v-model="visible" title="Modal Title" :backdrop="backdrop">
      <vs-content-paragraph size="small" />
    </Modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      backdrop: true,
    };
  },

  methods: {
    _handleOpen(backdrop) {
      this.visible = true;
      this.backdrop = backdrop;
    },
  },
};
</script>
```

<!--end-code-->
