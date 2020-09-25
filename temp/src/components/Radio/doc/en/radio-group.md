### Radio Group

<!--start-code-->

```vue
<template>
  <div>
    <RadioGroup :value="value" @change="_handleChange">
      <p>Group1</p>
      <Radio value="A">Item A</Radio>
      <Radio value="B">Item B</Radio>
      <p>Group2</p>
      <Radio value="C">Item C</Radio>
      <Radio value="D" disabled>
        Item D
      </Radio>
    </RadioGroup>

    <hr />

    <json-pretty :data="{ value: value }" />
  </div>
</template>

<script>
export default {
  data() {
    return { value: 'A' };
  },

  methods: {
    _handleChange(value) {
      this.value = value;
    },
  },
};
</script>
```

<!--end-code-->
