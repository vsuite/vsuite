### Overflow

<!--start-code-->

```vue
<template>
  <div>
    <ButtonToolbar>
      <Button @click="_handleOpen(false)">Overflow = false</Button>
      <Button @click="_handleOpen(true)">Overflow = true</Button>
    </ButtonToolbar>

    <Modal v-model="visible" :overflow="overflow" title="Modal Title">
      <vs-content-paragraph size="small" />
    </Modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      overflow: false,
    };
  },

  methods: {
    _handleOpen(overflow) {
      this.overflow = overflow;
      this.visible = true;
    },
  },
};
</script>
```

<!--end-code-->
