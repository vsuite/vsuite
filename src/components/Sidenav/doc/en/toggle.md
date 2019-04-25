### Open/Close Menu

<!--start-code-->

```vue
<template>
  <div>
    <ButtonGroup>
      <Button appearance="primary" @click="_handleOpen">
        展开
      </Button>
      <Button appearance="primary" @click="_handleClose">
        收起
      </Button>
    </ButtonGroup>

    <div style="width: 250px;display: inline-block; margin: 0 10px 50px 0;">
      <Sidenav
        :expanded="expanded"
        :openKeys="openKeys"
        :activeKey="activeKey"
        @select="_handleSelect"
        @openChange="_handleOpenChange"
      >
        <SidenavBody>
          <Nav>
            <NavItem eventKey="1" active icon="dashboard">Dashboard</NavItem>
            <NavItem eventKey="2" icon="group">User Group</NavItem>
            <Dropdown eventKey="3" title="Advanced" icon="magic">
              <DropdownItem eventKey="3-1">Geo</DropdownItem>
              <DropdownItem eventKey="3-2">Devices</DropdownItem>
              <DropdownItem eventKey="3-3">Loyalty</DropdownItem>
              <DropdownItem eventKey="3-4">Visit Depth</DropdownItem>
            </Dropdown>
            <Dropdown eventKey="4" title="Settings" icon="gear-circle">
              <DropdownItem eventKey="4-1">Applications</DropdownItem>
              <DropdownItem eventKey="4-2">Channels</DropdownItem>
              <DropdownItem eventKey="4-3">Versions</DropdownItem>
              <DropdownMenu eventKey="4-5" title="Custom Action">
                <DropdownItem eventKey="4-5-1">Action Name</DropdownItem>
                <DropdownItem eventKey="4-5-2">
                  Action Params
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Nav>
        </SidenavBody>
      </Sidenav>
    </div>

    <div style="width: 250px;display: inline-block; margin: 0 10px 50px 0;">
      <Sidenav
        appearance="inverse"
        :expanded="expanded"
        :openKeys="openKeys"
        :activeKey="activeKey"
        @select="_handleSelect"
        @openChange="_handleOpenChange"
      >
        <SidenavBody>
          <Nav>
            <NavItem eventKey="1" active icon="dashboard">Dashboard</NavItem>
            <NavItem eventKey="2" icon="group">User Group</NavItem>
            <Dropdown eventKey="3" title="Advanced" icon="magic">
              <DropdownItem eventKey="3-1">Geo</DropdownItem>
              <DropdownItem eventKey="3-2">Devices</DropdownItem>
              <DropdownItem eventKey="3-3">Loyalty</DropdownItem>
              <DropdownItem eventKey="3-4">Visit Depth</DropdownItem>
            </Dropdown>
            <Dropdown eventKey="4" title="Settings" icon="gear-circle">
              <DropdownItem eventKey="4-1">Applications</DropdownItem>
              <DropdownItem eventKey="4-2">Channels</DropdownItem>
              <DropdownItem eventKey="4-3">Versions</DropdownItem>
              <DropdownMenu eventKey="4-5" title="Custom Action">
                <DropdownItem eventKey="4-5-1">Action Name</DropdownItem>
                <DropdownItem eventKey="4-5-2">
                  Action Params
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Nav>
        </SidenavBody>
      </Sidenav>
    </div>

    <div style="width: 250px;display: inline-block; margin: 0 10px 50px 0;">
      <Sidenav
        appearance="subtle"
        :expanded="expanded"
        :openKeys="openKeys"
        :activeKey="activeKey"
        @select="_handleSelect"
        @openChange="_handleOpenChange"
      >
        <SidenavBody>
          <Nav>
            <NavItem eventKey="1" active icon="dashboard">Dashboard</NavItem>
            <NavItem eventKey="2" icon="group">User Group</NavItem>
            <Dropdown eventKey="3" title="Advanced" icon="magic">
              <DropdownItem eventKey="3-1">Geo</DropdownItem>
              <DropdownItem eventKey="3-2">Devices</DropdownItem>
              <DropdownItem eventKey="3-3">Loyalty</DropdownItem>
              <DropdownItem eventKey="3-4">Visit Depth</DropdownItem>
            </Dropdown>
            <Dropdown eventKey="4" title="Settings" icon="gear-circle">
              <DropdownItem eventKey="4-1">Applications</DropdownItem>
              <DropdownItem eventKey="4-2">Channels</DropdownItem>
              <DropdownItem eventKey="4-3">Versions</DropdownItem>
              <DropdownMenu eventKey="4-5" title="Custom Action">
                <DropdownItem eventKey="4-5-1">Action Name</DropdownItem>
                <DropdownItem eventKey="4-5-2">
                  Action Params
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Nav>
        </SidenavBody>
      </Sidenav>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      openKeys: ['3', '4'],
      expanded: true,
      activeKey: null,
    };
  },

  methods: {
    _handleOpen() {
      this.expanded = true;
    },

    _handleClose() {
      this.expanded = false;
    },

    _handleSelect(eventKey) {
      this.activeKey = eventKey;
    },

    _handleOpenChange(openKeys) {
      this.openKeys = openKeys;
    },
  },
};
</script>
```

<!--end-code-->
