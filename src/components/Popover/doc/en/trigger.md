### Triggering events

There are five kinds of events that can trigger the message `Popover`: `click`、`right-click`、`focus`、`hover`、`active`

<!--start-code-->

```vue
<template>
  <ButtonToolbar>
    <Popover v-for="trigger in triggers" :trigger="trigger" title="Title">
      <Button>{{ trigger }}</Button>
      <template slot="content">
        <p>This is a default Popover</p>
        <p>Content</p>
      </template>
    </Popover>
  </ButtonToolbar>
</template>

<script>
export default {
  data() {
    return {
      triggers: ['click', 'right-click', 'hover', 'focus', 'active'],
    };
  },
};
</script>
```

<!--end-code-->

> Note: [Safari ignoring tabindex](https://stackoverflow.com/questions/1848390/safari-ignoring-tabindex)
