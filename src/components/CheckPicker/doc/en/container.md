### Container

<!--start-code-->

```vue
<template>
  <div class="container">
    <div class="wrapper">
      <CheckPicker style="width: 224px;" :data="data" :modifiers="modifiers" />
    </div>
  </div>
</template>

<script>
import data from 'stories/data/user';

export default {
  data() {
    return {
      data,
      modifiers: {
        preventOverflow: { enabled: false },
        flip: { enabled: false },
      },
    };
  },
};
</script>

<style>
.container {
  position: relative;
  height: 200px;
  overflow: auto;
  box-shadow: #999 1px 1px 5px inset;
  padding: 50px;
}

.wrapper {
  height: 500px;
}
</style>
```

<!--end-code-->
