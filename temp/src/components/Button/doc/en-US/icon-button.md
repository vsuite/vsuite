### IconButton

`IconButton` is a component designed for icon buttons that sets the icon required for the `Icon` property definition. Only the icon button can be set to a round button.

<!--start-code-->

```vue
<template>
  <div>
    <ButtonToolbar>
      <IconButton icon="star" />
      <IconButton icon="star" appearance="primary" />
      <ButtonGroup>
        <IconButton icon="align-left" />
        <IconButton icon="align-center" />
        <IconButton icon="align-right" />
        <IconButton icon="align-justify" />
      </ButtonGroup>
    </ButtonToolbar>

    <ButtonToolbar>
      <IconButton size="lg" icon="star" />
      <IconButton size="lg" :icon="SvgIcons.search" />
      <IconButton size="md" icon="star" />
      <IconButton size="md" :icon="SvgIcons.search" />
      <IconButton size="sm" icon="star" />
      <IconButton size="sm" :icon="SvgIcons.search" />
      <IconButton size="xs" icon="star" />
      <IconButton size="xs" :icon="SvgIcons.search" />
    </ButtonToolbar>

    <ButtonToolbar>
      <IconButton icon="facebook-official" color="blue" circle />
      <IconButton icon="google-plus-circle" color="red" circle />
      <IconButton icon="twitter" color="cyan" circle />
      <IconButton icon="linkedin" color="blue" circle />
    </ButtonToolbar>

    <ButtonToolbar>
      <IconButton icon="pause" placement="left">
        Pause
      </IconButton>
      <IconButton icon="arrow-right" placement="right">
        Next
      </IconButton>
    </ButtonToolbar>

    <ButtonToolbar>
      <IconButton :icon="SvgIcons.component">
        Component
      </IconButton>
    </ButtonToolbar>
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
