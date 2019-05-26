### Controlled

<!--start-code-->

```vue
<template>
  <CheckPicker style="width: 224px;" visible :data="data" :value="['Julius']" />
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
