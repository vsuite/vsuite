### CheckboxGroup Group

<!--start-code-->

```vue
<template>
  <div>
    <CheckboxGroup v-model="value">
      <p>Group1</p>
      <Checkbox value="A">Item A</Checkbox>
      <Checkbox value="B">Item B</Checkbox>
      <p>Group2</p>
      <Checkbox value="C">Item C</Checkbox>
      <Checkbox value="D" disabled>
        Item D
      </Checkbox>
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
