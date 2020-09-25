### 线形进度

<!--start-code-->

```vue
<template>
  <div>
    <ProgressLine />
    <ProgressLine :percent="30" strokeColor="yellow" />
    <ProgressLine :percent="30" status="active" />
    <ProgressLine :percent="50" status="fail" />
    <ProgressLine :percent="100" status="success" />
    <ProgressLine :percent="80" :showInfo="false" />
  </div>
</template>
```

<!--end-code-->
