### Sticky

Set the `sticky` property to put the selected in the options to the top.

<!--start-code-->

```vue
<template>
  <div>
    <CheckPicker
      style="width: 224px;"
      sticky
      :data="data"
      :defaultValue="['Kenya', 'Julius']"
    />
    <hr />
    <CheckPicker
      style="width: 224px;"
      sticky
      groupBy="role"
      :data="data"
      :defaultValue="['Kenya', 'Julius']"
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
