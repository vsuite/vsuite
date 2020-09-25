### Extra footer

Customize a select all function.

<!--start-code-->

```vue
<template>
  <CheckPicker
    style="width: 224px;"
    :data="data"
    :value="value"
    ref="picker"
    @change="_handleChange"
  >
    <div class="footer" slot="footer">
      <Checkbox
        inline
        :indeterminate="indeterminate"
        :checked="checkAll"
        @change="_handleCheckAll"
      >
        Select All
      </Checkbox>

      <Button
        class="footer-button"
        appearance="primary"
        size="sm"
        @click="_handleOk"
      >
        Ok
      </Button>
    </div>
  </CheckPicker>
</template>

<style scoped>
.footer {
  padding: 10px 2px;
  border-top: 1px solid #e5e5e5;
}

.footer-button {
  float: right;
  margin: 2px 10px 0 0;
}
</style>

<script>
import data from 'stories/data/user';

export default {
  data() {
    return {
      value: [],
      checkAll: false,
      indeterminate: false,
      data,
    };
  },

  methods: {
    _handleOk() {
      this.$refs.picker.hide();
    },

    _handleChange(value) {
      const allValue = data.map(item => item.value);

      this.value = value;
      this.indeterminate = value.length > 0 && value.length < allValue.length;
      this.checkAll = value.length === allValue.length;
    },

    _handleCheckAll(value, checked) {
      const allValue = data.map(item => item.value);

      this.value = checked ? allValue : [];
      this.indeterminate = false;
      this.checkAll = checked;
    },
  },
};
</script>
```

<!--end-code-->
