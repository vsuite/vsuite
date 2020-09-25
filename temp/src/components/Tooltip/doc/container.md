### 设置容器

<!--start-code-->

```vue
<template>
  <div
    style="position: relative;height: 200px;overflow: scroll;background-color: #f1f1f1;box-shadow: #999 1px 1px 5px inset; padding: 50px"
  >
    <div style="height: 500px">
      <Tooltip
        visible
        white
        trigger="click"
        title="This is a ToolTip for simple text hints. It can replace the title property"
      >
        <Button>Click Me</Button>
      </Tooltip>
    </div>
  </div>
</template>
```

<!--end-code-->
