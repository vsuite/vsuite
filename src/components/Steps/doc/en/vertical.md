### Vertical

<!--start-code-->

```vue
<template>
  <div>
    <Steps
      :current="1"
      vertical
      style="width: 200px; display: inline-block; vertical-align: top;"
    >
      <StepItem title="Finished" />
      <StepItem title="In progress" />
      <StepItem title="Waiting" />
      <StepItem title="Waiting" />
    </Steps>

    <Steps
      :current="1"
      vertical
      style="width: 200px; display: inline-block; vertical-align: top;"
    >
      <StepItem title="Finished" description="Description" />
      <StepItem title="In Progress" description="Description" />
      <StepItem title="Waiting" description="Description" />
      <StepItem title="Waiting" description="Description" />
    </Steps>
  </div>
</template>
```

<!--end-code-->
