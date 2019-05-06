### Controlled

<!--start-code-->

```vue
<template>
  <div style="width: 160px;">
    <InputNumber :value="0.01" :step="0.01" />

    <hr />

    <InputNumber v-model="value" :step="0.01" />
  </div>
</template>

<script>
export default {
  data() {
    return { value: 0.01 };
  },
};
</script>
```

<!--end-code-->
