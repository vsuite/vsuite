### Size

<!--start-code-->

```vue
<template>
  <div>
    <ButtonToolbar>
      <IconButton icon="angle-left" @click="_handleOpen('left', 'lg')">
        Large Left
      </IconButton>
      <IconButton icon="angle-right" @click="_handleOpen('right', 'lg')">
        Large Right
      </IconButton>
      <IconButton icon="angle-up" @click="_handleOpen('top', 'lg')">
        Large Top
      </IconButton>
      <IconButton icon="angle-down" @click="_handleOpen('bottom', 'lg')">
        Large Bottom
      </IconButton>
    </ButtonToolbar>

    <ButtonToolbar>
      <IconButton icon="angle-left" @click="_handleOpen('left', 'md')">
        Medium Left
      </IconButton>
      <IconButton icon="angle-right" @click="_handleOpen('right', 'md')">
        Medium Right
      </IconButton>
      <IconButton icon="angle-up" @click="_handleOpen('top', 'md')">
        Medium Top
      </IconButton>
      <IconButton icon="angle-down" @click="_handleOpen('bottom', 'md')">
        Medium Bottom
      </IconButton>
    </ButtonToolbar>

    <ButtonToolbar>
      <IconButton icon="angle-left" @click="_handleOpen('left', 'sm')">
        Small Left
      </IconButton>
      <IconButton icon="angle-right" @click="_handleOpen('right', 'sm')">
        Small Right
      </IconButton>
      <IconButton icon="angle-up" @click="_handleOpen('top', 'sm')">
        Small Top
      </IconButton>
      <IconButton icon="angle-down" @click="_handleOpen('bottom', 'sm')">
        Small Bottom
      </IconButton>
    </ButtonToolbar>

    <ButtonToolbar>
      <IconButton icon="angle-left" @click="_handleOpen('left', 'xs')">
        XSmall Left
      </IconButton>
      <IconButton icon="angle-right" @click="_handleOpen('right', 'xs')">
        XSmall Right
      </IconButton>
      <IconButton icon="angle-up" @click="_handleOpen('top', 'xs')">
        XSmall Top
      </IconButton>
      <IconButton icon="angle-down" @click="_handleOpen('bottom', 'xs')">
        XSmall Bottom
      </IconButton>
    </ButtonToolbar>
  </div>
</template>

<script>
export default {
  data() {
    return { visible: false, placement: 'right', size: 'sm' };
  },

  methods: {
    _handleOpen(placement, size) {
      this.visible = true;
      this.placement = placement;
      this.size = size;
    },
  },
};
</script>
```

<!--end-code-->
