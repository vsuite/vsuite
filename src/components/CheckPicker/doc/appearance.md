### 外观

<!--start-code-->

```vue
<template>
  <div>
    <CheckPicker
      style="width: 224px;"
      :data="data"
      appearance="default"
      placeholder="Default"
    />
    <hr />
    <CheckPicker
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
