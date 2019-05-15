### 文字和图标

可以通过 `checkedChildren`,`unCheckedChildren` 两个属性分别设置开关两种状态下显示的内容

<!--start-code-->

```vue
<template>
  <div>
    <Toggle style="margin-right: 8px;" size="lg" open="打开" close="关闭" />

    <Toggle style="margin-right: 8px;">
      <Icon slot="open" icon="check" />
      <Icon slot="close" icon="close" />
    </Toggle>
  </div>
</template>
```

<!--end-code-->
