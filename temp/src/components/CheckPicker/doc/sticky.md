### 置顶已选项

设置 `sticky`属性， 把选项中已选择的选项置顶在最前面。

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
