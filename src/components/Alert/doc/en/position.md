### Position

<!--start-code-->

```vue
<template>
  <ButtonToolbar>
    <Button @click="_handleOpen('top', { top: 20 })">
      top = 20px
    </Button>
    <Button @click="_handleOpen('bottom', { bottom: 20 })">
      bottom = 20px
    </Button>
  </ButtonToolbar>
</template>

<script>
export default {
  methods: {
    _handleOpen(type) {
      this.$Alert.open(`This is a ${placement} message`, {
        key: placement,
        placement,
        ...options,
      });
    },
  },
};
</script>
```

<!--end-code-->
