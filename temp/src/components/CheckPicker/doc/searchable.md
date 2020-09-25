### 禁用搜索框

<!--start-code-->

```vue
<template>
  <CheckPicker style="width: 224px;" :searchable="false" :data="data" />
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
