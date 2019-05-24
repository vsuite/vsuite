### 受控

<!--start-code-->

```vue
<template>
  <SelectPicker style="width: 224px;" visible value="Julius" :data="data" />
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
