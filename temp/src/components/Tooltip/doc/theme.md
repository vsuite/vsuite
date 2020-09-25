### 白色主题

<!--start-code-->

```vue
<template>
  <div>
    <Tooltip
      v-for="placement in placements"
      inline
      white
      :placement="placement"
      title="This is a ToolTip for simple text hints. It can replace the title property"
    />
  </div>
</template>

<script>
import Popper from 'popper.js';

export default {
  data() {
    return {
      placements: Popper.placements,
    };
  },
};
</script>
```

<!--end-code-->
