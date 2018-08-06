import { storiesOf } from '@storybook/vue';
import Demo from 'stories/demo';
import Popover from 'components/Popover';
import Button from 'components/Button';
import Tooltip from 'components/Tooltip';
import { action } from '@storybook/addon-actions';

const stories = storiesOf('Utils|Popover', module);

stories.add('default', () => ({
  data() {
    return {
      visible: false,
    };
  },

  render() {
    return (
      <Demo title="Default">
        <Popover
          visible={this.visible}
          placement="right"
          onCreate={action('create')}
          onUpdate={action('update')}
          onShow={action('show')}
          onHide={action('hide')}
          onChange={action('change')}
        >
          <Button onClick={this._handleClick}>SUBMIT</Button>
          <Tooltip visible slot="content">
            Submit now!
          </Tooltip>
        </Popover>
      </Demo>
    );
  },

  methods: {
    _handleClick() {
      this.visible = !this.visible;
    },
  },
}));
