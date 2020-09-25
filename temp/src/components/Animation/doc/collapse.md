### Collapse 折叠展开

<!--start-code-->

```vue
<template>
  <div>
    <Button @click="_handleToggle">toggle</Button>
    <hr />
    <Collapse>
      <div
        v-if="show"
        style="background: #000; width: 100px; height: 160px; overflow: hidden;"
      >
        <p>Panel</p>
        <p>Content Content Content</p>
      </div>
    </Collapse>
  </div>
</template>

<script>
export default {
  data() {
    return { show: true };
  },

  methods: {
    _handleToggle() {
      this.show = !this.show;
    },
  },
};
</script>
```

<!--end-code-->
