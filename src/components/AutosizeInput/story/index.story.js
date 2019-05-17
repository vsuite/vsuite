import { storiesOf } from '@storybook/vue';
import Demo from 'stories/demo';

import AutosizeInput from 'components/AutosizeInput';

const stories = storiesOf('Utils|AutosizeInput', module);

stories.add('default', () => ({
  data() {
    return {
      value: '',
    };
  },

  render() {
    return (
      <Demo title="Default">
        <AutosizeInput
          value={this.value}
          inputStyle={{ maxWidth: '100px' }}
          onInput={this._handleInput}
        />
      </Demo>
    );
  },

  methods: {
    _handleInput(event) {
      this.value = event.target.value;
    },
  },
}));

stories.add('placeholder', () => ({
  data() {
    return {
      value: '',
    };
  },

  render() {
    return (
      <Demo title="Placeholder">
        <AutosizeInput
          value={this.value}
          placeholder="Please enter"
          inputStyle={{ maxWidth: '300px' }}
          onInput={this._handleInput}
        />
      </Demo>
    );
  },

  methods: {
    _handleInput(event) {
      this.value = event.target.value;
    },
  },
}));
