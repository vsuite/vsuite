### 位置

<!--start-code-->

```vue
<template>
  <ButtonToolbar>
    <Button @click="_handleOpen('top')">top</Button>
    <Button @click="_handleOpen('bottom')">bottom</Button>
  </ButtonToolbar>
</template>

<script>
export default {
  methods: {
    _handleOpen(placement) {
      this.$Alert.open(`This is a ${placement} message.`, { placement });
    },
  },
};
</script>
```

<!--end-code-->
