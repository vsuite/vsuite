### Advanced

<!--start-code-->

```vue
<template>
  <div>
    <div>
      <span> first： <Toggle v-model="first" /> </span>
      <span> first： <Toggle v-model="last" /> </span>
      <span> first： <Toggle v-model="prev" /> </span>
      <span> first： <Toggle v-model="next" /> </span>
      <br />
      <br />
      <span> first： <Toggle v-model="ellipsis" /> </span>
      <span> first： <Toggle v-model="boundaryLinks" /> </span>
    </div>

    <Divider />

    <Pagination
      :first="first"
      :last="last"
      :prev="prev"
      :next="next"
      :ellipsis="ellipsis"
      :boundaryLinks="boundaryLinks"
      :maxButtons="5"
      :pages="30"
      :activePage="activePage"
      @select="_handleSelect"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      prev: true,
      next: true,
      first: true,
      last: true,
      ellipsis: true,
      boundaryLinks: true,
      activePage: 1,
    };
  },

  methods: {
    _handleSelect(key) {
      this.activePage = key;
    },
  },
};
</script>
```

<!--end-code-->
