import { storiesOf } from '@storybook/vue';

import Tooltip from 'components/Tooltip';
import Button from 'components/Button';
import Demo from 'stories/demo';

const stories = storiesOf('General|Tooltip', module);

stories.add('default', () => ({
  render() {
    return (
      <Demo title="Default">
        <Tooltip inline>
          <template slot="title">
            This is a <i>tooltip</i> .
          </template>
        </Tooltip>
      </Demo>
    );
  },
}));

stories.add('placement', () => ({
  render(h) {
    return (
      <Demo title="Placement">
        <table class="placement-table" cellSpacing={5}>
          <tbody>
            <tr>
              <td />
              <td>{this._renderTooltip(h, 'top-start')}</td>
              <td>{this._renderTooltip(h, 'top')}</td>
              <td>{this._renderTooltip(h, 'top-end')}</td>
              <td />
            </tr>
            <tr>
              <td>{this._renderTooltip(h, 'right-start')}</td>
              <td />
              <td />
              <td />
              <td>{this._renderTooltip(h, 'left-start')}</td>
            </tr>
            <tr>
              <td>{this._renderTooltip(h, 'right')}</td>
              <td />
              <td />
              <td />
              <td>{this._renderTooltip(h, 'left')}</td>
            </tr>

            <tr>
              <td>{this._renderTooltip(h, 'right-end')}</td>
              <td />
              <td />
              <td />
              <td>{this._renderTooltip(h, 'left-end')}</td>
            </tr>
            <tr>
              <td />
              <td>{this._renderTooltip(h, 'bottom-start')}</td>
              <td>{this._renderTooltip(h, 'bottom')}</td>
              <td>{this._renderTooltip(h, 'bottom-end')}</td>
              <td />
            </tr>
          </tbody>
        </table>

        <hr />

        {this._renderTooltip(h, 'auto')}
        <br />
        {this._renderTooltip(h, 'auto-start')}
        <br />
        {this._renderTooltip(h, 'auto-end')}
      </Demo>
    );
  },

  methods: {
    _renderTooltip(h, placement) {
      return (
        <Tooltip
          style={{ margin: '10px' }}
          trigger="click"
          placement={placement}
          title="This is a ToolTip for simple text hints. It can replace the title property"
        >
          <Button>{placement}</Button>
        </Tooltip>
      );
    },
  },
}));
