### Custom Icon

Custom Icon to render an externally-introduced SVG file.

<!--start-code-->

```vue
<template>
  <div>
    <Icon :icon="SvgIcons.vsuite" size="lg" />
    <Icon :icon="SvgIcons.guide" size="lg" />
    <Icon :icon="SvgIcons.component" size="lg" />
    <Icon :icon="SvgIcons.tools" size="lg" />
    <Icon :icon="SvgIcons.search" size="lg" />
  </div>
</template>

<script>
import * as SvgIcons from 'stories/svg';

export default {
  data() {
    return { SvgIcons };
  },
};
</script>
```

<!--end-code-->

You also need to configure SVG loader in webpack to use [svg-sprite-loader](https://github.com/kisenka/svg-sprite-loader)

```js
{
  test: /\.svg$/,
  use: [{
    loader: 'svg-sprite-loader',
    options: {
      symbolId: 'icon-[name]'
    }
  }]
}
```
