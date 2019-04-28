### Size

<!--start-code-->

```vue
<template>
  <div>
    <Pagination
      prev
      last
      next
      first
      size="lg"
      :pages="10"
      :activePage="activePage"
      @select="_handleSelect"
    />
    <Divider />
    <Pagination
      prev
      last
      next
      first
      size="md"
      :pages="10"
      :activePage="activePage"
      @select="_handleSelect"
    />
    <Divider />
    <Pagination
      prev
      last
      next
      first
      size="sm"
      :pages="10"
      :activePage="activePage"
      @select="_handleSelect"
    />
    <Divider />
    <Pagination
      prev
      last
      next
      first
      size="xs"
      :pages="10"
      :activePage="activePage"
      @select="_handleSelect"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      activePage: 5,
    };
  },

  methods: {
    _handleSelect(eventKey) {
      this.activePage = eventKey;
    },
  },
};
</script>
```

<!--end-code-->
