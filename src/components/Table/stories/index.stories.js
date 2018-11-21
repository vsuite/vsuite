import { storiesOf } from '@storybook/vue';
import users from 'stories/data/users';

import IconButton from 'components/IconButton';
import Divider from 'components/Divider';
import Popover from 'components/Popover';
import Dropdown from 'components/Dropdown';
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
stories.add('custom cell', () => ({
  data() {
    return {
      columns: [
        {
          width: 50,
          title: 'Checkbox',
          key: 'checkbox',
          type: 'checkbox',
        },
        {
          width: 80,
          title: 'Avartar',
          dataIndex: 'avartar',
          align: 'center',
          style: { padding: '0' },
          render(h, avatarUrl) {
            return (
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  background: '#f5f5f5',
                  borderRadius: '20px',
                  marginTop: '2px',
                  overflow: 'hidden',
                  display: 'inline-block',
                }}
              >
                <img src={avatarUrl} width="44px" />
              </div>
            );
          },
        },
        {
          width: 160,
          title: 'First Name',
          key: 'firstName',
          render(h, { firstName, lastName, email, companyName, sentence }) {
            return (
              <Popover
                transfer
                title="Description"
                placement="top-start"
                trigger="hover"
              >
                <a
                  style={{
                    display: 'inline-block',
                    width: '128px',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    verticalAlign: 'bottom',
                  }}
                >
                  {firstName}
                </a>
                <template slot="content">
                  <p>
                    <b>Name:</b> {`${firstName} ${lastName}`}{' '}
                  </p>
                  <p>
                    <b>Email:</b> {email}{' '}
                  </p>
                  <p>
                    <b>Company:</b> {companyName}{' '}
                  </p>
                  <p>
                    <b>Sentence:</b> {sentence}{' '}
                  </p>
                </template>
              </Popover>
            );
          },
        },
        {
          width: 300,
          title: 'Email',
          dataIndex: 'email',
          render(h, email) {
            return <a href={`mailto:${email}`}>{email}</a>;
          },
        },
        {
          width: 200,
          title: 'Action',
          key: 'action',
          style: { padding: '5px' },
          render() {
            return (
              <div>
                <IconButton appearance="subtle" icon="edit2" />
                <Divider vertical />
                <Popover
                  transfer
                  title="Description"
                  placement="bottom-end"
                  trigger="click"
                >
                  <IconButton appearance="subtle" icon="more" />
                  <Dropdown.Menu slot="content">
                    <Dropdown.Item eventKey={3}>Download As...</Dropdown.Item>
                    <Dropdown.Item eventKey={4}>Export PDF</Dropdown.Item>
                    <Dropdown.Item eventKey={5}>Export HTML</Dropdown.Item>
                    <Dropdown.Item eventKey={6}>Settings</Dropdown.Item>
                    <Dropdown.Item eventKey={7}>About</Dropdown.Item>
                  </Dropdown.Menu>
                </Popover>
              </div>
            );
          },
        },
      ],
    };
  },

  render() {
    return (
      <Demo title="Custom Cell">
        <Table height={420} columns={this.columns} data={users} />
      </Demo>
    );
  },
}));

// custom header cell

// sort

// pagination

// tree

// expand

// editable

// loading
