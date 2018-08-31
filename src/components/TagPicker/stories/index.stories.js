import { storiesOf } from '@storybook/vue';
import Demo from 'stories/demo';

import TagPicker from 'components/TagPicker';

const stories = storiesOf('Data Entry|TagPicker', module);
const data = [
  {
    label: 'Eugenia',
    value: 'Eugenia',
    role: 'Master',
  },
  {
    label: 'Kariane',
    value: 'Kariane',
    role: 'Master',
  },
  {
    label: 'Louisa',
    value: 'Louisa',
    role: 'Master',
  },
  {
    label: 'Marty',
    value: 'Marty',
    role: 'Master',
  },
  {
    label: 'Kenya',
    value: 'Kenya',
    role: 'Master',
  },
  {
    label: 'Hal',
    value: 'Hal',
    role: 'Developer',
  },
  {
    label: 'Julius',
    value: 'Julius',
    role: 'Developer',
  },
  {
    label: 'Travon',
    value: 'Travon',
    role: 'Developer',
  },
  {
    label: 'Vincenza',
    value: 'Vincenza',
    role: 'Developer',
  },
  {
    label: 'Dominic',
    value: 'Dominic',
    role: 'Developer',
  },
  {
    label: 'Pearlie',
    value: 'Pearlie',
    role: 'Guest',
  },
  {
    label: 'Tyrel',
    value: 'Tyrel',
    role: 'Guest',
  },
  {
    label: 'Jaylen',
    value: 'Jaylen',
    role: 'Guest',
  },
  {
    label: 'Rogelio',
    value: 'Rogelio',
    role: 'Guest',
  },
];

stories.add('default', () => ({
  render() {
    return (
      <Demo title="Default">
        <TagPicker
          style={{ width: '300px' }}
          menuStyle={{ width: '300px' }}
          data={data}
        />
      </Demo>
    );
  },
}));
