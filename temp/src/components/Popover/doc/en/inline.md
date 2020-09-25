### Inline Mode

<!--start-code-->

```vue
<template>
  <div>
    <Popover
      style="margin: 10px"
      inline
      :placement="placement"
      title="This is a tooltip."
      v-for="placement in placements"
    >
      <template slot="content">
        <p>This is a default Popover</p>
        <p>Content</p>
      </template>
    </Popover>
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
