### Custom Side Navigation

- Set the `panel` property to customize a panel area.
- Set the `divider` property and set a split line.

<!--start-code-->

```vue
<template>
  <div style="width: 250px">
    <Sidenav :defaultOpenKeys="['3', '4']">
      <SidenavHeader>
        <div
          style="padding: 20px; font-size: 16px; background: #34c3ff; color: #fff;"
        >
          Custom Sidenav
        </div>
      </SidenavHeader>
      <SidenavBody>
        <Nav>
          <Nav.Item eventKey="1" active icon="dashboard">
            Dashboard
          </Nav.Item>
          <Nav.Item eventKey="2" icon="group">
            User Group
          </Nav.Item>
          <Dropdown eventKey="3" title="Advanced" icon="magic">
            <DropdownItem divider />
            <DropdownItem panel style="padding: 15px 20px; color: #aaa;">
              Reports
            </DropdownItem>
            <DropdownItem eventKey="3-1">Geo</DropdownItem>
            <DropdownItem eventKey="3-2">Devices</DropdownItem>
            <DropdownItem eventKey="3-3">Loyalty</DropdownItem>
            <DropdownItem eventKey="3-4">Visit Depth</DropdownItem>
            <DropdownItem divider />
            <DropdownItem panel style="padding: 15px 20px; color: #aaa;">
              Settings
            </DropdownItem>
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
</template>
```

<!--end-code-->
