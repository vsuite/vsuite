### Custom

<!--start-code-->

```vue
<template>
  <TagPicker
    style="width: 300px"
    :data="data"
    groupBy="role"
    placeholder="Select User"
  >
    <template slot="menu-item" slot-scope="{ label }">
      <div><i class="vs-icon vs-icon-user" /> {label}</div>
    </template>

    <template slot="menu-group" slot-scope="{ label, item }">
      <div>
        <i class="vs-icon vs-icon-group" /> {label} - ( {item.children.length})
      </div>
    </template>

    <template slot="value" slot-scope="{ label }">
      <div>
        <span style="color: #575757"> <i class="vs-icon vs-icon-user" /> </span
        >{' '} {label}
      </div>
    </template>
  </TagPicker>
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
