### 位置

- `left` , `top` , `right` , `bottom` 是 4 个方向, 表示显示的位置。
- `leftTop` , 在 left 后面加了一个 top, 这里的 top 是对齐方式，表示在触发点的左侧显示，同时居上对齐。

<!--start-code-->

```vue
<template>
  <div>
    <table class="placement-table" cellSpacing="{5}">
      <tbody>
        <tr>
          <td />
          <td>
            <Tooltip
              trigger="click"
              placement="bottom-start"
              title="This is a ToolTip for simple text hints. It can replace the title property"
            >
              <Button>bottom-start</Button>
            </Tooltip>
          </td>
          <td>
            <Tooltip
              trigger="click"
              placement="bottom"
              title="This is a ToolTip for simple text hints. It can replace the title property"
            >
              <Button>bottom</Button>
            </Tooltip>
          </td>
          <td>
            <Tooltip
              trigger="click"
              placement="bottom-end"
              title="This is a ToolTip for simple text hints. It can replace the title property"
            >
              <Button>bottom-end</Button>
            </Tooltip>
          </td>
          <td />
        </tr>
        <tr>
          <td>
            <Tooltip
              trigger="click"
              placement="right-start"
              title="This is a ToolTip for simple text hints. It can replace the title property"
            >
              <Button>right-start</Button>
            </Tooltip>
          </td>
          <td />
          <td />
          <td />
          <td>
            <Tooltip
              trigger="click"
              placement="left-start"
              title="This is a ToolTip for simple text hints. It can replace the title property"
            >
              <Button>left-start</Button>
            </Tooltip>
          </td>
        </tr>
        <tr>
          <td>
            <Tooltip
              trigger="click"
              placement="right"
              title="This is a ToolTip for simple text hints. It can replace the title property"
            >
              <Button>right</Button>
            </Tooltip>
          </td>
          <td />
          <td />
          <td />
          <td>
            <Tooltip
              trigger="click"
              placement="left"
              title="This is a ToolTip for simple text hints. It can replace the title property"
            >
              <Button>left</Button>
            </Tooltip>
          </td>
        </tr>

        <tr>
          <td>
            <Tooltip
              trigger="click"
              placement="right-end"
              title="This is a ToolTip for simple text hints. It can replace the title property"
            >
              <Button>right-end</Button>
            </Tooltip>
          </td>
          <td />
          <td />
          <td />
          <td>
            <Tooltip
              trigger="click"
              placement="left-end"
              title="This is a ToolTip for simple text hints. It can replace the title property"
            >
              <Button>left-end</Button>
            </Tooltip>
          </td>
        </tr>
        <tr>
          <td />
          <td>
            <Tooltip
              trigger="click"
              placement="top-start"
              title="This is a ToolTip for simple text hints. It can replace the title property"
            >
              <Button>top-start</Button>
            </Tooltip>
          </td>
          <td>
            <Tooltip
              trigger="click"
              placement="top"
              title="This is a ToolTip for simple text hints. It can replace the title property"
            >
              <Button>top</Button>
            </Tooltip>
          </td>
          <td>
            <Tooltip
              trigger="click"
              placement="top-end"
              title="This is a ToolTip for simple text hints. It can replace the title property"
            >
              <Button>top-end</Button>
            </Tooltip>
          </td>
          <td />
        </tr>
      </tbody>
    </table>

    <hr />

    <Tooltip
      trigger="click"
      placement="auto"
      title="This is a ToolTip for simple text hints. It can replace the title property"
    >
      <Button>auto</Button>
    </Tooltip>
    <br />
    <Tooltip
      trigger="click"
      placement="auto-start"
      title="This is a ToolTip for simple text hints. It can replace the title property"
    >
      <Button>auto-start</Button>
    </Tooltip>
    <br />
    <Tooltip
      trigger="click"
      placement="auto-end"
      title="This is a ToolTip for simple text hints. It can replace the title property"
    >
      <Button>auto-end</Button>
    </Tooltip>
  </div>
</template>
```

<!--end-code-->
