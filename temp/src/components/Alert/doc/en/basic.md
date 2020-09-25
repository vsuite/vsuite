### Basic

<!--start-code-->

```vue
<template>
  <Button @click="_handleOpen"> Default </Button>
</template>

<script>
export default {
  methods: {
    _handleOpen() {
      this.$Alert.open('This is an alert message.');
    },
  },
};
</script>
```

<!--end-code-->
