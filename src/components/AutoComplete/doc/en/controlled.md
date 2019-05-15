### Controlled

<!--start-code-->

```vue
<template>
  <AutoComplete :data="list" value="HYPER" visible />
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
