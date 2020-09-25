### 动态展示

<!--start-code-->

```vue
<template>
  <div>
    <Steps :current="step" :currentStatus="status">
      <StepItem title="Finished" description="Description" />
      <StepItem title="In Progress" description="Description" />
      <StepItem title="Waiting" description="Description" />
      <StepItem title="Waiting" description="Description" />
    </Steps>
    <hr />
    <ButtonGroup>
      <Button @click="decline" :disabled="step === 0">
        Previous
      </Button>
      <Button @click="increase" :disabled="step === 4">
        Next
      </Button>
    </ButtonGroup>
  </div>
</template>

<script>
export default {
  data() {
    return { step: 0, status: 'process' };
  },

  methods: {
    decline() {
      if (this.step <= 0) return;

      this.step -= 1;
    },

    increase() {
      if (this.step >= 4) return;

      this.step += 1;
    },
  },
};
</script>
```

<!--end-code-->
