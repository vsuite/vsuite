### 可新建

<!--start-code-->

```vue
<template>
  <div>
    <InputPicker creatable :data="data" style="width: 224px;" />
    <hr />
    <InputPicker creatable :data="data" style="width: 224px;" groupBy="role" />
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
