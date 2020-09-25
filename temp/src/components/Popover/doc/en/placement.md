### Placement

<!--start-code-->

```vue
<template>
  <div>
    <table cellspacing="5">
      <tbody>
        <tr>
          <td></td>
          <td>
            <Popover
              style="margin: 10px"
              placement="bottom-start"
              title="This is a tooltip."
            >
              <Button>bottom-start</Button>
              <template slot="content">
                <p>This is a default Popover</p>
                <p>Content</p>
              </template>
            </Popover>
          </td>
          <td>
            <Popover
              style="margin: 10px"
              placement="bottom"
              title="This is a tooltip."
            >
              <Button>bottom</Button>
              <template slot="content">
                <p>This is a default Popover</p>
                <p>Content</p>
              </template>
            </Popover>
          </td>
          <td>
            <Popover
              style="margin: 10px"
              placement="bottom-end"
              title="This is a tooltip."
            >
              <Button>bottom-end</Button>
              <template slot="content">
                <p>This is a default Popover</p>
                <p>Content</p>
              </template>
            </Popover>
          </td>
          <td></td>
        </tr>
        <tr>
          <td>
            <Popover
              style="margin: 10px"
              placement="right-start"
              title="This is a tooltip."
            >
              <Button>right-start</Button>
              <template slot="content">
                <p>This is a default Popover</p>
                <p>Content</p>
              </template>
            </Popover>
          </td>
          <td />
          <td />
          <td />
          <td>
            <Popover
              style="margin: 10px"
              placement="left-start"
              title="This is a tooltip."
            >
              <Button>left-start</Button>
              <template slot="content">
                <p>This is a default Popover</p>
                <p>Content</p>
              </template>
            </Popover>
          </td>
        </tr>
        <tr>
          <td>
            <Popover
              style="margin: 10px"
              placement="right"
              title="This is a tooltip."
            >
              <Button>right</Button>
              <template slot="content">
                <p>This is a default Popover</p>
                <p>Content</p>
              </template>
            </Popover>
          </td>
          <td />
          <td />
          <td />
          <td>
            <Popover
              style="margin: 10px"
              placement="left"
              title="This is a tooltip."
            >
              <Button>left</Button>
              <template slot="content">
                <p>This is a default Popover</p>
                <p>Content</p>
              </template>
            </Popover>
          </td>
        </tr>
        <tr>
          <td>
            <Popover
              style="margin: 10px"
              placement="right-end"
              title="This is a tooltip."
            >
              <Button>right-end</Button>
              <template slot="content">
                <p>This is a default Popover</p>
                <p>Content</p>
              </template>
            </Popover>
          </td>
          <td />
          <td />
          <td />
          <td>
            <Popover
              style="margin: 10px"
              placement="left-end"
              title="This is a tooltip."
            >
              <Button>left-end</Button>
              <template slot="content">
                <p>This is a default Popover</p>
                <p>Content</p>
              </template>
            </Popover>
          </td>
        </tr>
        <tr>
          <td />
          <td>
            <Popover
              style="margin: 10px"
              placement="top-start"
              title="This is a tooltip."
            >
              <Button>top-start</Button>
              <template slot="content">
                <p>This is a default Popover</p>
                <p>Content</p>
              </template>
            </Popover>
          </td>
          <td>
            <Popover
              style="margin: 10px"
              placement="top"
              title="This is a tooltip."
            >
              <Button>top</Button>
              <template slot="content">
                <p>This is a default Popover</p>
                <p>Content</p>
              </template>
            </Popover>
          </td>
          <td>
            <Popover
              style="margin: 10px"
              placement="top-end"
              title="This is a tooltip."
            >
              <Button>top-end</Button>
              <template slot="content">
                <p>This is a default Popover</p>
                <p>Content</p>
              </template>
            </Popover>
          </td>
          <td />
        </tr>
      </tbody>
    </table>

    <hr />

    <Popover style="margin: 10px" placement="auto" title="This is a tooltip.">
      <Button>auto</Button>
      <template slot="content">
        <p>This is a default Popover</p>
        <p>Content</p>
      </template>
    </Popover>

    <hr />

    <Popover
      style="margin: 10px"
      placement="auto-start"
      title="This is a tooltip."
    >
      <Button>auto-start</Button>
      <template slot="content">
        <p>This is a default Popover</p>
        <p>Content</p>
      </template>
    </Popover>

    <hr />

    <Popover
      style="margin: 10px"
      placement="auto-end"
      title="This is a tooltip."
    >
      <Button>auto-end</Button>
      <template slot="content">
        <p>This is a default Popover</p>
        <p>Content</p>
      </template>
    </Popover>
  </div>
</template>
```

<!--end-code-->
