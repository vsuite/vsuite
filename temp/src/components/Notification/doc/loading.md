### 加载中

<!--start-code-->

```vue
<template>
  <ButtonToolbar>
    <Button @click="_handleOpen">Open</Button>
  </ButtonToolbar>
</template>

<script>
import { Paragraph } from 'stories/content';

export default {
  methods: {
    _handleOpen() {
      this.$Notification.loading('Notify', h => (
        <Paragraph style={{ width: '320px' }} size="small" />
      ));
    },
  },
};
</script>
```

<!--end-code-->
