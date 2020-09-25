### 延迟显示

<!--start-code-->

```vue
<template>
  <Popover :delay="1000" title="This is a tooltip.">
    <Button>click delay 1s</Button>
    <template slot="content">
      <p>This is a default Popover</p>
      <p>Content</p>
    </template>
  </Popover>
</template>
```

<!--end-code-->
