import { storiesOf } from '@storybook/vue';

import Pagination from 'components/Pagination';
import Divider from 'components/Divider';
import Toggle from 'components/Toggle';
import Demo from 'stories/demo';

const stories = storiesOf('Navigation|Pagination', module);

stories.add('basic', () => ({
  render: h => {
    return (
      <Demo title="Basic">
        <Pagination pages={10} activePage={1} />
      </Demo>
    );
  },
}));

stories.add('size', () => ({
  data() {
    return {
      activePage: 5,
    };
  },

  render() {
    return (
      <Demo title="Size">
        <Pagination
          prev
          last
          next
          first
          size="lg"
          pages={10}
          activePage={this.activePage}
          onSelect={this.handleSelect}
        />
        <Divider />
        <Pagination
          prev
          last
          next
          first
          size="md"
          pages={10}
          activePage={this.activePage}
          onSelect={this.handleSelect}
        />
        <Divider />
        <Pagination
          prev
          last
          next
          first
          size="sm"
          pages={10}
          activePage={this.activePage}
          onSelect={this.handleSelect}
        />
        <Divider />
        <Pagination
          prev
          last
          next
          first
          size="xs"
          pages={10}
          activePage={this.activePage}
          onSelect={this.handleSelect}
        />
      </Demo>
    );
  },

  methods: {
    handleSelect(eventKey) {
      this.activePage = eventKey;
    },
  },
}));

stories.add('disabled', () => ({
  render: h => {
    return (
      <Demo title="Disabled">
        <Pagination disabled pages={10} activePage={1} prev last next first />
      </Demo>
    );
  },
}));

stories.add('advanced', () => ({
  data() {
    return {
      prev: true,
      next: true,
      first: true,
      last: true,
      ellipsis: true,
      boundaryLinks: true,
      activePage: 1,
    };
  },

  render() {
    return (
      <Demo title="Advanced">
        <div>
          {this._renderToggle('first')}
          {this._renderToggle('last')}
          {this._renderToggle('prev')}
          {this._renderToggle('next')}
          <br />
          <br />
          {this._renderToggle('ellipsis')}
          {this._renderToggle('boundaryLinks')}
        </div>

        <Divider />

        <Pagination
          first={this.first}
          last={this.last}
          prev={this.prev}
          next={this.next}
          ellipsis={this.ellipsis}
          boundaryLinks={this.boundaryLinks}
          maxButtons={5}
          pages={30}
          activePage={this.activePage}
          onSelect={this._handleSelect}
        />
      </Demo>
    );
  },

  methods: {
    _renderToggle(type) {
      return (
        <span>
          {type}：
          <Toggle
            checked={this[type]}
            onChange={() => (this[type] = !this[type])}
          />
        </span>
      );
    },

    _handleSelect(key) {
      this.activePage = key;
    },
  },
}));
