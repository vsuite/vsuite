### Position

<!--start-code-->

```vue
<template>
  <ButtonToolbar>
    <Button @click="_handleOpen('topLeft', { top: 5, left: 5 })">
      Top=5 Left=5
    </Button>
    <Button @click="_handleOpen('topRight', { top: 5, right: 5 })">
      Top=5 Right=5
    </Button>
    <Button @click="_handleOpen('bottomLeft', { bottom: 5, left: 5 })">
      Bottom=5 Left=5
    </Button>
    <Button @click="_handleOpen('bottomRight', { bottom: 5, right: 5 })">
      Bottom=5 Right=5
    </Button>
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
        { placement, ...options }
      );
    },
  },
};
</script>
```

<!--end-code-->
