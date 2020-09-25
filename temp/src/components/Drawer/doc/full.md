### 全屏

<!--start-code-->

```vue
<template>
  <div>
    <ButtonToolbar>
      <IconButton icon="angle-left" @click="_handleOpen('left')">
        Left
      </IconButton>
      <IconButton icon="angle-right" @click="_handleOpen('right')">
        Right
      </IconButton>
      <IconButton icon="angle-up" @click="_handleOpen('top')">
        Top
      </IconButton>
      <IconButton icon="angle-down" @click="_handleOpen('bottom')">
        Bottom
      </IconButton>
    </ButtonToolbar>

    <Drawer v-model="visible" full :placement="placement" title="Drawer Title">
      <vs-content-paragraph />
    </Drawer>
  </div>
</template>

<script>
export default {
  data() {
    return { visible: false, placement: 'right' };
  },

  methods: {
    _handleOpen(placement) {
      this.visible = true;
      this.placement = placement;
    },
  },
};
</script>
```

<!--end-code-->
