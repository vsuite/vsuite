### 自定义 Icon

自定义 Icon, 可以渲染一个外部引入的 svg 文件。

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

同时需要在 webpack 中配置 svg loader, 这里用到一个 [svg-sprite-loader](https://github.com/kisenka/svg-sprite-loader)

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
