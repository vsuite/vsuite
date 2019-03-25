### 触发事件

有五种状态可以触发提示 `Popover` 的信息: `click`、`right-click`、`focus`、`hover`、`active`

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

> 注意: [Safari ignoring tabindex](https://stackoverflow.com/questions/1848390/safari-ignoring-tabindex)
