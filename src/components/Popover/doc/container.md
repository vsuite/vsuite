### 设置容器

`Popover` 会渲染在容器内部，跟随按钮一起滚动。

<!--start-code-->

```vue
<template>
  <div class="container">
    <div style="height: 500px">
      <Popover visible title="This is a tooltip.">
        <Button>click</Button>
        <template slot="content">
          <p>This is a default Popover</p>
          <p>Content</p>
        </template>
      </Popover>
    </div>
  </div>
</template>

<style scoped>
.container {
  position: relative;
  height: 200px;
  overflow: scroll;
  background: #f1f1f1;
  box-shadow: #999 1px 1px 5px inset;
  padding: 50px;
}
</style>
```

<!--end-code-->
