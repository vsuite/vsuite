import { storiesOf } from '@storybook/vue';
import users from 'stories/data/users';

import Table from 'components/Table';
import Demo from 'stories/demo';

const stories = storiesOf('Data Display|Table', module);

// default
stories.add('default', () => ({
  data() {
    return {
      columns: [
        {
          width: 70,
          title: 'Id',
          dataIndex: 'id',
          fixed: true,
        },
        {
          width: 200,
          title: 'First Name',
          dataIndex: 'firstName',
          fixed: true,
        },
        {
          width: 200,
          title: 'Last Name',
          dataIndex: 'lastName',
        },
        {
          width: 200,
          title: 'City',
          dataIndex: 'city',
        },
        {
          width: 200,
          title: 'Street',
          dataIndex: 'street',
        },
        {
          width: 300,
          title: 'Company Name',
          dataIndex: 'companyName',
        },
        {
          width: 300,
          title: 'Email',
          dataIndex: 'email',
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
          maxWidth: 150,
          title: 'Id',
          dataIndex: 'id',
          align: 'center',
          resizable: true,
        },
        {
          minWidth: 200,
          title: 'First Name',
          dataIndex: 'firstName',
          resizable: true,
        },
        {
          minWidth: 200,
          title: 'Last Name',
          dataIndex: 'lastName',
          resizable: true,
        },
        {
          minWidth: 200,
          title: 'City',
          dataIndex: 'city',
          resizable: true,
        },
        {
          minWidth: 300,
          title: 'Company Name',
          dataIndex: 'companyName',
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
          dataIndex: 'id',
        },
        {
          width: 200,
          title: 'First Name',
          dataIndex: 'firstName',
        },
        {
          minWidth: 100,
          flex: 1,
          title(h) {
            return (
              <span>
                City <code>flex=1</code>
              </span>
            );
          },
          dataIndex: 'city',
        },
        {
          minWidth: 150,
          flex: 2,
          title(h) {
            return (
              <span>
                Company Name <code>flex=2</code>
              </span>
            );
          },
          dataIndex: 'companyName',
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
          dataIndex: 'id',
          fixed: true,
        },
        {
          minWidth: 200,
          title: 'First Name',
          dataIndex: 'firstName',
          resizable: true,
          fixed: true,
        },
        {
          minWidth: 200,
          title: 'Last Name',
          dataIndex: 'lastName',
          resizable: true,
          fixed: 'right',
        },
        {
          width: 200,
          title: 'City',
          dataIndex: 'city',
        },
        {
          width: 200,
          title: 'Street',
          dataIndex: 'street',
        },
        {
          width: 300,
          title: 'Company Name',
          dataIndex: 'companyName',
        },
        {
          width: 300,
          title: 'Email',
          dataIndex: 'email',
        },
      ],
    };
  },

  render() {
    return (
      <Demo title="Word Wrap">
        <Table
          wordWrap
          rowKey="id"
          height={420}
          columns={this.columns}
          data={users}
        />
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
          dataIndex: 'id',
          fixed: true,
        },
        {
          title: 'Name',
          children: [
            {
              width: 200,
              title: 'First Name',
              dataIndex: 'firstName',
              fixed: true,
            },
            {
              width: 200,
              title: 'Last Name',
              dataIndex: 'lastName',
            },
          ],
        },
        {
          width: 200,
          title: 'City',
          dataIndex: 'city',
        },
        {
          width: 200,
          title: 'Street',
          dataIndex: 'street',
        },
        {
          width: 300,
          title: 'Company Name',
          dataIndex: 'companyName',
        },
        {
          width: 300,
          title: 'Email',
          dataIndex: 'email',
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
