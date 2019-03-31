### Placement

<!--start-code-->

```vue
<template>
  <ButtonToolbar>
    <Button @click="_handleOpen('topLeft')"> Top Left </Button>
    <Button @click="_handleOpen('topRight')"> Top Right </Button>
    <Button @click="_handleOpen('bottomLeft')"> Bottom Left </Button>
    <Button @click="_handleOpen('bottomRight')"> Bottom Right </Button>
  </ButtonToolbar>
</template>

<script>
import { Paragraph } from 'stories/content';

export default {
  methods: {
    _handleOpen(placement) {
      this.$Notification.open(
        placement,
        h => <Paragraph style={{ width: '320px' }} size="small" />,
        { placement }
      );
    },
  },
};
</script>
```

<!--end-code-->
