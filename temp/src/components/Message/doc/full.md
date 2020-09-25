### 消息框撑满容器

<!--start-code-->

```vue
<template>
  <vs-content class="content">
    <Message full showIcon type="warning" description="Warning" />
    <vs-content-paragraph />
  </vs-content>
</template>

<style scoped>
.content {
  background: #000;
  padding: 20px;
  position: relative;
}
</style>
```

<!--end-code-->
