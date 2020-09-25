import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';

import Tag from 'components/Tag';
import Input from 'components/Input';
import Button from 'components/Button';
import Demo from 'stories/demo';

const stories = storiesOf('Data Display|Tag', module);

stories.add('default', () => ({
  render() {
    return (
      <Demo title="Default">
        <Tag.Group>
          <Tag>Text</Tag>
          <Tag closable onClose={action('@close')}>
            Closable
          </Tag>
          <Tag>
            <a target="_blank" href="http://www.hypers.com">
              Link
            </a>
          </Tag>
        </Tag.Group>
      </Demo>
    );
  },
}));

stories.add('color', () => ({
  render() {
    return (
      <Demo title="Color">
        <Tag.Group>
          <Tag color="red">Red</Tag>
          <Tag color="orange">Orange</Tag>
          <Tag color="yellow">Yellow</Tag>
          <Tag color="green">Green</Tag>
          <Tag color="cyan">Cyan</Tag>
          <Tag color="blue">Blue</Tag>
          <Tag color="violet">Violet</Tag>
        </Tag.Group>
      </Demo>
    );
  },
}));

stories.add('dynamic', () => ({
  data() {
    return {
      typing: false,
      inputVal: '',
      tags: ['javascript', 'css', 'vue'],
    };
  },

  render(h) {
    return (
      <Demo title="Dynamic">
        <Tag.Group>
          {this.tags.map((item, index) => (
            <Tag
              key={index}
              closable
              onClose={() => this._handleTagRemove(item)}
            >
              {item}
            </Tag>
          ))}
          {this._renderInput(h)}
        </Tag.Group>
      </Demo>
    );
  },

  methods: {
    _renderInput() {
      if (this.typing) {
        return (
          <Input
            style="display: inline-block; margin-left: 10px; width: 70px;"
            ref="input"
            size="xs"
            value={this.inputVal}
            onChange={this._handleInputChange}
            onBlur={this._handleInputConfirm}
            onPressEnter={this._handleInputConfirm}
          />
        );
      }

      return (
        <Button.Icon
          style="display: inline-block; margin-left: 10px;"
          icon="plus"
          appearance="ghost"
          size="xs"
          onClick={this._handleButtonClick}
        />
      );
    },

    _handleTagRemove(tag) {
      const index = this.tags.indexOf(tag);

      if (index === -1) return;

      this.tags.splice(index, 1);
    },

    _handleButtonClick() {
      this.typing = true;

      this.$nextTick(() => this.$refs.input.focus());
    },

    _handleInputChange(val) {
      this.inputVal = val;
    },

    _handleInputConfirm() {
      this.typing = false;

      if (!this.inputVal) return;

      this.tags.push(this.inputVal);
      this.inputVal = '';
    },
  },
}));
