### Radio 组 - Picker

<!--start-code-->

```vue
<template>
  <div>
    <RadioGroup
      inline
      appearance="picker"
      :value="value"
      @change="_handleChange"
    >
      <Radio value="A">Item A</Radio>
      <Radio value="B">Item B</Radio>
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
