### Controlled

<!--start-code-->

```vue
<template>
  <TagPicker visible :value="['Julius']" :data="data" style="width: 300px;" />
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
