### Checkbox 组 Indeterminate 状态

<!--start-code-->

```vue
<template>
  <div>
    <Checkbox
      :indeterminate="indeterminate"
      :checked="checkAll"
      @change="_handleCheckAll"
    >
      Check All
    </Checkbox>

    <hr />

    <CheckboxGroup inline :value="value" @change="_handleChange">
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
    return {
      options: ['A', 'B', 'C', 'D'],
      value: [],
      indeterminate: false,
      checkAll: false,
    };
  },

  methods: {
    _handleChange(v) {
      const optionsLen = this.options.length;
      const valueLen = v ? v.length : 0;

      this.value = v;
      this.indeterminate = optionsLen > valueLen && valueLen > 0;
      this.checkAll = optionsLen === valueLen;
    },

    _handleCheckAll(checked) {
      this.value = checked ? [...this.options] : [];
      this.indeterminate = false;
      this.checkAll = checked;
    },
  },
};
</script>
```

<!--end-code-->
