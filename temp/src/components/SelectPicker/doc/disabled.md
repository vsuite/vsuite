### 禁用

<!--start-code-->

```vue
<template>
  <div>
    <SelectPicker
      :data="data"
      defaultValue="Julius"
      disabled
      style="width: 224px;"
    />

    <hr />

    <p>禁用选项</p>
    <SelectPicker
      :data="data"
      defaultValue="Julius"
      :disabledItemValues="['Eugenia', 'Travon', 'Vincenza']"
      style="width: 224px;"
    />
  </div>
</template>

<script>
import data from 'stories/data/user';

export default {
  data() {
    return { data };
  },
};
</script>
```

<!--end-code-->
