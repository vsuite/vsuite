### 外观

`appearance` 属性设置导航外观:

- 'default'(默认值) 默认导航。
- 'tabs' 标签式的导航。
- 'subtle' 弱化的导航。

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

> 针对 subtle/tabs 导航，可以设置一个 `reversed` 属性颠倒方向，用来适配导航在上下左右都可以使用。
