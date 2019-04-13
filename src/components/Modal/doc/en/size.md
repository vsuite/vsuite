### Size

<!--start-code-->

```vue
<template>
  <div>
    <ButtonToolbar>
      <Button size="xs" @click="_handleOpen('xs')">Xsmall</Button>
      <Button size="sm" @click="_handleOpen('sm')">Small</Button>
      <Button size="md" @click="_handleOpen('md')">Medium</Button>
      <Button size="lg" @click="_handleOpen('lg')">Large</Button>
    </ButtonToolbar>

    <Modal v-model="visible" title="Modal Title" :size="size">
      <vs-content-paragraph size="small" />
    </Modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      size: 'sm',
    };
  },

  methods: {
    _handleOpen(size) {
      this.visible = true;
      this.size = size;
    },
  },
};
</script>
```

<!--end-code-->
