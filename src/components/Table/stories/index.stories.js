import { storiesOf } from '@storybook/vue';
import users from 'stories/data/users';

import Table from 'components/Table';
import Demo from 'stories/demo';

const stories = storiesOf('Data Display|Table', module);

stories.add('default', () => ({
  data() {
    return {
      columns: [
        {
          fixed: true,
          width: 70,
          title: 'Id',
          key: 'id',
        },
        {
          width: 200,
          title: 'First Name',
          key: 'firstName',
        },
        {
          width: 200,
          title: 'Last Name',
          key: 'lastName',
        },
        {
          width: 200,
          title: 'City',
          key: 'city',
        },
        {
          width: 200,
          title: 'Street',
          key: 'street',
        },
        {
          width: 300,
          title: 'Company Name',
          key: 'companyName',
        },
        {
          width: 300,
          title: 'Email',
          key: 'email',
        },
      ],
    };
  },

  render() {
    return (
      <Demo title="Default">
        <Table height={400} columns={this.columns} data={users} />
      </Demo>
    );
  },
}));
