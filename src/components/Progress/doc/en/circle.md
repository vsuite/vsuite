### Circle

<!--start-code-->

```vue
<template>
  <div>
    <div class="circle">
      <ProgressCircle />
    </div>
    <div class="circle">
      <ProgressCircle :percent="30" strokeColor="yellow" />
    </div>
    <div class="circle">
      <ProgressCircle :percent="100" status="success" />
    </div>
    <div class="circle">
      <ProgressCircle :percent="30" status="fail" />
    </div>
    <div class="circle">
      <ProgressCircle :percent="30" status="active" :showInfo="false" />
    </div>
  </div>
</template>

<style scoped>
.circle {
  display: inline-block;
  width: 120px;
  margin: 10px;
}
</style>
```

<!--end-code-->
