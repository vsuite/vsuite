### 设置 SVG 图标的颜色

如果你需要 svg 图标颜色与文字颜色一致，可以使用 [currentColor](https://caniuse.com/#search=currentColor)以确保你的 `fill`、 `strocke` 颜色与字体颜色保持一致。如果你使用了 [svg-sprite-loader](https://github.com/kisenka/svg-sprite-loader)，则应对 `use` 元素设置 `currentColor`。

<!--start-code-->

```vue
<template>
  <IconButton appearance="ghost" size="lg">
    <Icon
      slot="icon"
      style="fill: currentColor"
      :icon="SvgIcons.search"
      size="lg"
    />
    Search
  </IconButton>
</template>

<script>
import * as SvgIcons from 'stories/svg';

export default {
  data() {
    return { SvgIcons };
  },
};
</script>

<style scoped>
.vs-icon.fill-color use {
  fill: currentColor;
}
</style>
```

<!--end-code-->
