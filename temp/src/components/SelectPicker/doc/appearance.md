### 外观

<!--start-code-->

```vue
<template>
  <div>
    <SelectPicker
      style="width: 224px;"
      :data="data"
      appearance="default"
      placeholder="Default"
    />
    <hr />
    <SelectPicker
      style="width: 224px;"
      :data="data"
      appearance="subtle"
      placeholder="Subtle"
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
