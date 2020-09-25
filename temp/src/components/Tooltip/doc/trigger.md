### 触发事件

有五种状态可以触发提示 `tooltip` 的信息: `click`、`right-click`、`focus`、`hover`、`active`

<!--start-code-->

```vue
<template>
  <ButtonToolbar>
    <Tooltip
      trigger="click"
      title="This is a ToolTip for simple text hints. It can replace the title property"
    >
      <Button>click</Button>
    </Tooltip>
    <Tooltip
      trigger="right-click"
      title="This is a ToolTip for simple text hints. It can replace the title property"
    >
      <Button>right-click</Button>
    </Tooltip>
    <Tooltip
      trigger="hover"
      title="This is a ToolTip for simple text hints. It can replace the title property"
    >
      <Button>hover</Button>
    </Tooltip>
    <Tooltip
      trigger="focus"
      title="This is a ToolTip for simple text hints. It can replace the title property"
    >
      <Button>focus</Button>
    </Tooltip>
    <Tooltip
      trigger="active"
      title="This is a ToolTip for simple text hints. It can replace the title property"
    >
      <Button>active</Button>
    </Tooltip>
  </ButtonToolbar>
</template>
```

<!--end-code-->

> 注意: [Safari ignoring tabindex](https://stackoverflow.com/questions/1848390/safari-ignoring-tabindex)
