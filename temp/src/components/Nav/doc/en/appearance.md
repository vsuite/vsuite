### Appearance

`appearance` values include:

- 'default'
- 'tabs'
- 'subtle'

<!--start-code-->

```vue
<template>
  <div>
    <Nav
      :activeKey="active"
      style="margin-bottom: 50px;"
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

    <Nav
      :activeKey="active"
      appearance="tabs"
      style="margin-bottom: 50px;"
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

    <Nav
      :activeKey="active"
      appearance="tabs"
      reversed
      style="margin-bottom: 50px;"
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

    <Nav
      :activeKey="active"
      appearance="subtle"
      style="margin-bottom: 50px;"
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

    <Nav
      :activeKey="active"
      appearance="subtle"
      reversed
      style="margin-bottom: 50px;"
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
  </div>
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

> For subtle and tabs navigation, you can set a reversed property to reverse direction and fit all directions.
