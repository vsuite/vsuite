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
          width: 70,
          title: 'Id',
          key: 'id',
          fixed: true,
        },
        {
          width: 200,
          title: 'First Name',
          key: 'firstName',
          fixed: true,
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
        <Table height={420} columns={this.columns} data={users} />
      </Demo>
    );
  },
}));

// resiable
stories.add('resizable', () => ({
  data() {
    return {
      columns: [
        {
          minWidth: 70,
          title: 'Id',
          key: 'id',
          align: 'center',
          resizable: true,
        },
        {
          minWidth: 200,
          title: 'First Name',
          key: 'firstName',
          resizable: true,
        },
        {
          minWidth: 200,
          title: 'Last Name',
          key: 'lastName',
          resizable: true,
        },
        {
          minWidth: 200,
          title: 'City',
          key: 'city',
          resizable: true,
        },
        {
          minWidth: 300,
          title: 'Company Name',
          key: 'companyName',
          resizable: true,
        },
      ],
    };
  },

  render() {
    return (
      <Demo title="Resizable">
        <Table height={420} columns={this.columns} data={users} />
      </Demo>
    );
  },
}));

// flex
stories.add('flex', () => ({
  data() {
    return {
      columns: [
        {
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
          flex: 1,
          title: 'City',
          key: 'city',
        },
        {
          flex: 2,
          title: 'Company Name',
          key: 'companyName',
        },
      ],
    };
  },

  render() {
    return (
      <Demo title="Flex">
        <Table height={420} columns={this.columns} data={users} />
      </Demo>
    );
  },
}));

// word-wrap
stories.add('word-wrap', () => ({
  data() {
    return {
      columns: [
        {
          width: 70,
          title: 'Id',
          key: 'id',
          fixed: true,
        },
        {
          width: 200,
          title: 'First Name',
          key: 'firstName',
          fixed: true,
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
      <Demo title="Word Wrap">
        <Table wordWrap height={420} columns={this.columns} data={users} />
      </Demo>
    );
  },
}));

// children
stories.add('children', () => ({
  data() {
    return {
      columns: [
        {
          width: 70,
          title: 'Id',
          key: 'id',
          fixed: true,
        },
        {
          title: 'Name',
          children: [
            {
              width: 200,
              title: 'First Name',
              key: 'firstName',
              fixed: true,
            },
            {
              width: 200,
              title: 'Last Name',
              key: 'lastName',
            },
          ],
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
      <Demo title="Children">
        <Table height={420} columns={this.columns} data={users} />
      </Demo>
    );
  },
}));

// custom cell

// custom header cell

// sort

// pagination

// tree

// expand

// editable

// loading
