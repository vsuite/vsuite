### 分组

<!--start-code-->

```vue
<template>
  <div>
    <SelectPicker :data="data" groupBy="role" style="width: 224px;" />
    <hr />
    <h5>排序：</h5>
    <SelectPicker
      :data="data"
      groupBy="role"
      :sort="sort"
      style="width: 224px;"
    />
  </div>
</template>

<script>
import data from 'stories/data/user';

export default {
  data() {
    return { data };
  },

  methods: {
    sort(isGroup) {
      if (isGroup) {
        return (a, b) => {
          return this.compare(a.groupTitle, b.groupTitle);
        };
      }

      return (a, b) => {
        return this.compare(a.value, b.value);
      };
    },

    compare(a, b) {
      let nameA = a.toUpperCase();
      let nameB = b.toUpperCase();

      if (nameA < nameB) {
        return -1;
      }

      if (nameA > nameB) {
        return 1;
      }

      return 0;
    },
  },
};
</script>
```

<!--end-code-->
