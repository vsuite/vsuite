### Custom

<!--start-code-->

```vue
<template>
  <ButtonToolbar>
    <Button @click="_handleOpen">Open</Button>
  </ButtonToolbar>
</template>

<script>
import Button from 'components/Button';

export default {
  methods: {
    _handleOpen() {
      let instance = this.$Notification.open(
        'Message',
        h => (
          <div>
            <p>Simon wants to add you as a friend .</p>
            <Button.Toolbar>
              <Button onClick={() => instance.remove()}>Accept</Button>
              <Button onClick={() => instance.remove()}>Cancel</Button>
            </Button.Toolbar>
          </div>
        ),
        0
      );
    },
  },
};
</script>
```

<!--end-code-->
