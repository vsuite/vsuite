### Loading

<!--start-code-->

```vue
<template>
  <ButtonToolbar>
    <Button @click="_handleOpen">show loading</Button>
  </ButtonToolbar>
</template>

<script>
export default {
  methods: {
    _handleOpen() {
      this.$Alert.loading('This is a loading message.', 5000);
    },
  },
};
</script>
```

<!--end-code-->
