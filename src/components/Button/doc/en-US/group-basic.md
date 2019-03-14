### ButtonGroup

<!--start-code-->

```vue
<template>
  <div>
    <ButtonToolbar v-for="appearance in appearances" :key="appearance">
      <ButtonGroup>
        <Button :appearance="appearance">Left</Button>
        <Button :appearance="appearance">Center</Button>
        <Button :appearance="appearance">Right</Button>
      </ButtonGroup>
    </ButtonToolbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      appearances: ['primary', 'link', 'subtle', 'ghost'],
    };
  },
};
</script>
```

<!--end-code-->
