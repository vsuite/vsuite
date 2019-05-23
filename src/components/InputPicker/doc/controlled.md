### 受控

<!--start-code-->

```vue
<template>
  <InputPicker visible value="Julius" :data="data" style="width: 224px;" />
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
