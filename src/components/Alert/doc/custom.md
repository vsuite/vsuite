### 自定义

<!--start-code-->

```vue
<template>
  <ButtonToolbar>
    <Button @click="_handleOpen">custom alert</Button>
  </ButtonToolbar>
</template>

<script>
export default {
  methods: {
    _handleOpen() {
      let instance = null;

      instance = this.$Alert.open(
        h => (
          <div>
            Some text <Button onClick={() => instance.remove()}>close</Button>
          </div>
        ),
        0
      );
    },
  },
};
</script>
```

<!--end-code-->
