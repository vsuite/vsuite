### 禁用

<!--start-code-->

```vue
<template>
  <div>
    <TagPicker
      style="width: 300px"
      disabled
      :data="data"
      :defaultValue="['Julius']"
    />
    <hr />
    <p>禁用选项</p>
    <TagPicker
      style="width: 300px"
      :data="data"
      :defaultValue="['Julius']"
      :disabledItemValues="['Eugenia', 'Travon', 'Vincenza']"
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
