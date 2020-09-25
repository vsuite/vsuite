### Size

<!--start-code-->

```vue
<template>
  <Row>
    <Col :xs="24" :sm="12" :md="8">
      <Input style="margin-bottom: 10px" size="lg" placeholder="Large" />
      <Input style="margin-bottom: 10px" size="md" placeholder="Medium" />
      <Input style="margin-bottom: 10px" size="sm" placeholder="Small" />
      <Input style="margin-bottom: 10px" size="xs" placeholder="XSmall" />
    </Col>
    <Col :xs="24" :sm="12" :md="8">
      <InputGroup style="margin-bottom: 10px" size="lg">
        <Input placeholder="Large" />
        <InputGroupAddon>
          <Icon icon="search" />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup style="margin-bottom: 10px" size="md">
        <Input placeholder="Medium" />
        <InputGroupAddon>
          <Icon icon="search" />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup style="margin-bottom: 10px" size="sm">
        <Input placeholder="Small" />
        <InputGroupAddon>
          <Icon icon="search" />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup style="margin-bottom: 10px" size="xs">
        <Input placeholder="XSmall" />
        <InputGroupAddon>
          <Icon icon="search" />
        </InputGroupAddon>
      </InputGroup>
    </Col>
    <Col :xs="24" :sm="12" :md="8">
      <InputGroup inside style="margin-bottom: 10px" size="lg">
        <Input placeholder="Large" />
        <InputGroupButton>
          <Icon icon="search" />
        </InputGroupButton>
      </InputGroup>
      <InputGroup inside style="margin-bottom: 10px" size="md">
        <Input placeholder="Medium" />
        <InputGroupButton>
          <Icon icon="search" />
        </InputGroupButton>
      </InputGroup>
      <InputGroup inside style="margin-bottom: 10px" size="sm">
        <Input placeholder="Small" />
        <InputGroupButton>
          <Icon icon="search" />
        </InputGroupButton>
      </InputGroup>
      <InputGroup inside style="margin-bottom: 10px" size="xs">
        <Input placeholder="XSmall" />
        <InputGroupButton>
          <Icon icon="search" />
        </InputGroupButton>
      </InputGroup>
    </Col>
  </Row>
</template>
```

<!--end-code-->
