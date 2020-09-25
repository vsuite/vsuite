### Disable Search

<!--start-code-->

```vue
<template>
  <SelectPicker style="width: 224px;" :searchable="false" :data="data" />
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
