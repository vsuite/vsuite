### 可新建

<!--start-code-->

```vue
<template>
  <div>
    <TagPicker creatable :data="data" style="width: 300px" />
    <hr />
    <TagPicker creatable :data="data" groupBy="role" style="width: 300px" />
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
