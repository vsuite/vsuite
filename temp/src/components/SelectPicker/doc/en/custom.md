### Custom Option

<!--start-code-->

```vue
<template>
  <SelectPicker
    style="width: 224px;"
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
        <span style="color: #575757">
          <i class="vs-icon vs-icon-user" /> User : </span
        >{' '} {label}
      </div>
    </template>
  </SelectPicker>
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
