import { storiesOf } from '@storybook/vue';

import Radio from 'components/Radio';
import Demo from 'stories/demo';

const stories = storiesOf('Data Entry|RadioGroup', module);

stories.add('default', () => ({
  render() {
    return (
      <Demo title="Default">
        <Radio.Group>
          <p>Group1</p>
          <Radio value="A">Item A</Radio>
          <Radio value="B">Item B</Radio>
          <p>Group2</p>
          <Radio value="C">Item C</Radio>
          <Radio value="D" disabled>
            Item D
          </Radio>
        </Radio.Group>
      </Demo>
    );
  },
}));

stories.add('initial', () => ({
  render() {
    return (
      <Demo title="Initial">
        <Radio.Group defaultValue="A" inline>
          <Radio value="A">Item A</Radio>
          <Radio value="B">Item B</Radio>
          <Radio value="C">Item C</Radio>
          <Radio value="D" disabled>
            Item D
          </Radio>
        </Radio.Group>
      </Demo>
    );
  },
}));

stories.add('inline', () => ({
  render() {
    return (
      <Demo title="Inline">
        <Radio.Group inline>
          <Radio value="A">Item A</Radio>
          <Radio value="B">Item B</Radio>
          <Radio value="C">Item C</Radio>
          <Radio value="D" disabled>
            Item D
          </Radio>
        </Radio.Group>
      </Demo>
    );
  },
}));

stories.add('controlled', () => ({
  render() {
    return (
      <Demo title="Controlled">
        <Radio.Group value="A" inline>
          <Radio value="A">Item A</Radio>
          <Radio value="B">Item B</Radio>
          <Radio value="C">Item C</Radio>
          <Radio value="D" disabled>
            Item D
          </Radio>
        </Radio.Group>
      </Demo>
    );
  },
}));
