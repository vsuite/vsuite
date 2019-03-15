### Svg icon color

If you need the svg icon color to match the text color, you can use [currentColor](https://caniuse.com/#search=currentColor) to ensure that your `fill`,`strocke` colors match the font color.If you used [svg-sprite-loader](https://github.com/kisenka/svg-sprite-loader), you should set `currentColor` for `use` element.

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
