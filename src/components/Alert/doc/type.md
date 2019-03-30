### 类型

<!--start-code-->

```vue
<template>
  <ButtonToolbar>
    <Button @click="_handleOpen('info')"> Info </Button>
    <Button @click="_handleOpen('success')"> Success </Button>
    <Button @click="_handleOpen('warning')"> Warning </Button>
    <Button @click="_handleOpen('error')"> Error </Button>
  </ButtonToolbar>
</template>

<script>
export default {
  methods: {
    _handleOpen(type) {
      this.$Alert[type](`This is a ${type} message.`);
    },
  },
};
</script>
```

<!--end-code-->
