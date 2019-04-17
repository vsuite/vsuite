### Backdrop

<!--start-code-->

```vue
<template>
  <div>
    <ButtonToolbar>
      <Button @click="_handleOpen(true)">true</Button>
      <Button @click="_handleOpen(false)">false</Button>
      <Button @click="_handleOpen('static')">static</Button>
    </ButtonToolbar>

    <Drawer v-model="visible" :backdrop="backdrop" title="Drawer Title">
      <vs-content-paragraph />
    </Drawer>
  </div>
</template>

<script>
export default {
  data() {
    return { visible: false, backdrop: true };
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
