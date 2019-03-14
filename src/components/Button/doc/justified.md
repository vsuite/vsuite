### 等宽

按钮在按钮组中横向布局，并且等宽。

<!--start-code-->

```vue
<template>
  <div>
    <ButtonToolbar v-for="appearance in appearances" :key="appearance">
      <ButtonGroup style="marginTop: 12px" justified>
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
