### 受控的

<!--start-code-->

```vue
<template>
  <div>
    <Input
      style="width: 300px; margin-bottom: 10px;"
      value="You cannot change me!"
    />

    <Input
      style="width: 300px; margin-bottom: 10px;"
      placeholder="Default Input"
      v-model="value"
    />
  </div>
</template>

<script>
export default {
  data() {
    return { value: 'You can change me!' };
  },
};
</script>
```

<!--end-code-->
