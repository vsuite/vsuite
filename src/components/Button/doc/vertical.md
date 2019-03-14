### 垂直按钮组

<!--start-code-->

```vue
<template>
  <div>
    <ButtonToolbar v-for="appearance in appearances" :key="appearance">
      <ButtonGroup vertical>
        <Button :appearance="appearance">Top</Button>
        <Button :appearance="appearance">Middle</Button>
        <Button :appearance="appearance">Bottom</Button>
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
