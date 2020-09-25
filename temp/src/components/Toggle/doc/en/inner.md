### Text and icon

Can be set by the `checkedchildren`, `uncheckedchildren` two properties, respectively, the display of the toggle state.

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
