### Group

<!--start-code-->

```vue
<template>
  <div>
    <TagPicker style="width: 300px" :data="data" groupBy="role" />
    <hr />
    <h5>排序：</h5>
    <TagPicker style="width: 300px" :data="data" groupBy="role" :sort="sort" />
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
