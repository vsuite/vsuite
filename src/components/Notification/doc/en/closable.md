### Closable

<!--start-code-->

```vue
<template>
  <ButtonToolbar>
    <Button @click="_handleOpen('open')">Open</Button>
    <Button @click="_handleOpen('info')"> Info </Button>
    <Button @click="_handleOpen('success')"> Success </Button>
    <Button @click="_handleOpen('warning')"> Warning </Button>
    <Button @click="_handleOpen('error')"> Error </Button>
  </ButtonToolbar>
</template>

<script>
import { Paragraph } from 'stories/content';

export default {
  methods: {
    _handleOpen(status) {
      this.$Notification[status](
        status,
        h => <Paragraph style={{ width: '320px' }} size="small" />,
        { closable: true }
      );
    },
  },
};
</script>
```

<!--end-code-->
