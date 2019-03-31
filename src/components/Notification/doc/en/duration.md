### Duration

<!--start-code-->

```vue
<template>
  <ButtonToolbar>
    <Button @click="_handleOpen(10000)">Duration for 10s</Button>
    <Button @click="_handleOpenNoLimit">No Limit</Button>
  </ButtonToolbar>
</template>

<script>
import { Paragraph } from 'stories/content';

export default {
  methods: {
    _handleOpen(duration) {
      this.$Notification.open(
        'Duration for 10s',
        h => <Paragraph style={{ width: '320px' }} size="small" />,
        duration,
        { closable: true }
      );
    },

    _handleOpenNoLimit() {
      this.$Notification.open(
        'Always',
        h => <Paragraph style={{ width: '320px' }} size="small" />,
        0,
        { closable: true }
      );
    },
  },
};
</script>
```

<!--end-code-->
