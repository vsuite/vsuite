### Group

<!--start-code-->

```vue
<template>
  <div>
    <CheckPicker style="width: 224px;" groupBy="role" :data="data" />
    <hr />
    <h5>Sort:</h5>
    <CheckPicker
      style="width: 224px;"
      groupBy="role"
      :data="data"
      :sort="sort"
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
