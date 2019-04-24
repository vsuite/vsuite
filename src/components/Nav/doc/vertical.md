### 垂直布局

<!--start-code-->

```vue
<template>
  <Row>
    <Col :xs="12" :sm="6" :md="4">
      <Nav
        :activeKey="active"
        vertical
        style="width: 100px; margin-bottom: 50px;"
        @select="_handleSelect"
      >
        <NavItem eventKey="home" icon="home">
          Home
        </NavItem>
        <NavItem eventKey="news">News</NavItem>
        <NavItem eventKey="solutions">Solutions</NavItem>
        <NavItem eventKey="products">Products</NavItem>
        <NavItem eventKey="about">About</NavItem>
      </Nav>
    </Col>

    <Col :xs="12" :sm="6" :md="4">
      <Nav
        :activeKey="active"
        vertical
        appearance="tabs"
        style="width: 100px; margin-bottom: 50px;"
        @select="_handleSelect"
      >
        <NavItem eventKey="home" icon="home">
          Home
        </NavItem>
        <NavItem eventKey="news">News</NavItem>
        <NavItem eventKey="solutions">Solutions</NavItem>
        <NavItem eventKey="products">Products</NavItem>
        <NavItem eventKey="about">About</NavItem>
      </Nav>
    </Col>

    <Col :xs="12" :sm="6" :md="4">
      <Nav
        :activeKey="active"
        vertical
        appearance="tabs"
        reversed
        style="width: 100px; margin-bottom: 50px;"
        @select="_handleSelect"
      >
        <NavItem eventKey="home" icon="home">
          Home
        </NavItem>
        <NavItem eventKey="news">News</NavItem>
        <NavItem eventKey="solutions">Solutions</NavItem>
        <NavItem eventKey="products">Products</NavItem>
        <NavItem eventKey="about">About</NavItem>
      </Nav>
    </Col>

    <Col :xs="12" :sm="6" :md="4">
      <Nav
        :activeKey="active"
        vertical
        appearance="subtle"
        style="width: 100px; margin-bottom: 50px;"
        @select="_handleSelect"
      >
        <NavItem eventKey="home" icon="home">
          Home
        </NavItem>
        <NavItem eventKey="news">News</NavItem>
        <NavItem eventKey="solutions">Solutions</NavItem>
        <NavItem eventKey="products">Products</NavItem>
        <NavItem eventKey="about">About</NavItem>
      </Nav>
    </Col>

    <Col :xs="12" :sm="6" :md="4">
      <Nav
        :activeKey="active"
        vertical
        appearance="subtle"
        reversed
        style="width: 100px; margin-bottom: 50px;"
        @select="_handleSelect"
      >
        <NavItem eventKey="home" icon="home">
          Home
        </NavItem>
        <NavItem eventKey="news">News</NavItem>
        <NavItem eventKey="solutions">Solutions</NavItem>
        <NavItem eventKey="products">Products</NavItem>
        <NavItem eventKey="about">About</NavItem>
      </Nav>
    </Col>
  </Row>
</template>

<script>
export default {
  data() {
    return { active: 'home' };
  },

  methods: {
    _handleSelect(eventKey) {
      this.active = eventKey;
    },
  },
};
</script>
```

<!--end-code-->
