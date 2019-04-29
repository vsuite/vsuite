### Checkbox 组

<!--start-code-->

```vue
<template>
  <div>
    <CheckboxGroup inline v-model="value">
      <Checkbox value="A">Item A</Checkbox>
      <Checkbox value="B">Item B</Checkbox>
      <Checkbox value="C">Item C</Checkbox>
      <Checkbox value="D">Item D</Checkbox>
    </CheckboxGroup>

    <hr />

    <json-pretty :data="value" />
  </div>
</template>

<script>
export default {
  data() {
    return { value: [] };
  },
};
</script>
```

<!--end-code-->
