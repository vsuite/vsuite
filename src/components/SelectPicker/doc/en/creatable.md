### Creatable

<!--start-code-->

```vue
<template>
  <div>
    <SelectPicker creatable :data="data" style="width: 224px;" />
    <hr />
    <SelectPicker creatable :data="data" style="width: 224px;" groupBy="role" />
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
