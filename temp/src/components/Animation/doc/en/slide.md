### Slide

<!--start-code-->

```vue
<template>
  <div>
    <ButtonToolbar>
      <Button @click="_handleToggle('left')">Slide Left</Button>
      <Button @click="_handleToggle('right')">Slide Right</Button>
      <Button @click="_handleToggle('top')">Slide Top</Button>
      <Button @click="_handleToggle('bottom')">Slide Bottom</Button>
    </ButtonToolbar>
    <hr />
    <Slide :placement="placement">
      <div
        v-if="show"
        style="background: #000; width: 100px; height: 160px; overflow: hidden;"
      >
        <p>Panel</p>
        <p>Content Content Content</p>
      </div>
    </Slide>
  </div>
</template>

<script>
export default {
  data() {
    return { show: true, placement: 'left' };
  },

  methods: {
    _handleToggle(placement) {
      this.show = !this.show;
      this.placement = placement;
    },
  },
};
</script>
```

<!--end-code-->
