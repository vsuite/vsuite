### 默认

<!--start-code-->

```vue
<template>
  <div>
    <ButtonToolbar>
      <Button @click="_handleOpen">Open</Button>
    </ButtonToolbar>

    <Drawer v-model="visible" title="Drawer Title">
      <vs-content-paragraph />
    </Drawer>
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
  },
};
</script>
```

<!--end-code-->
