### 自定义选项

<!--start-code-->

```vue
<template>
  <AutoComplete :data="list">
    <template slot="item" slot-scope="item">
      <p><Icon icon="star" /> {{ item.label }}</p>
    </template>
  </AutoComplete>
</template>

<script>
export default {
  data() {
    return {
      list: [
        'HYPER Advertiser',
        'HYPER Web Analytics',
        'HYPER Video Analytics',
        'HYPER DMP',
        'HYPER Ad Serving',
        'HYPER Data Discovery',
      ],
    };
  },
};
</script>
```

<!--end-code-->
