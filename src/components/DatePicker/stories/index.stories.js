import { storiesOf } from '@storybook/vue';
import moment from 'moment';

import DatePicker from 'components/DatePicker';
import Demo from 'stories/demo';

const stories = storiesOf('Data Entry|DatePicker', module);

stories.add('default', () => ({
  render() {
    return (
      <Demo title="Default">
        <DatePicker style={{ width: '280px' }} />
      </Demo>
    );
  },
}));

stories.add('appearance', () => ({
  render() {
    return (
      <Demo title="Appearance">
        <DatePicker
          style={{ width: '280px' }}
          appearance="default"
          placeholder="Default"
        />
        <hr />
        <DatePicker
          style={{ width: '280px' }}
          appearance="subtle"
          placeholder="Subtle"
        />
      </Demo>
    );
  },
}));

stories.add('block', () => ({
  render() {
    return (
      <Demo title="Block">
        <DatePicker block />
      </Demo>
    );
  },
}));

stories.add('placeholder', () => ({
  render() {
    return (
      <Demo title="Placeholder">
        <DatePicker style={{ width: '280px' }} placeholder="选择日期" />
      </Demo>
    );
  },
}));

stories.add('inline', () => ({
  render() {
    return (
      <Demo title="Inline">
        <DatePicker inline />
      </Demo>
    );
  },
}));

stories.add('date & time', () => ({
  render() {
    return (
      <Demo title="Date & Time">
        <DatePicker
          style={{ width: '280px' }}
          format="YYYY-MM-DD HH:mm:ss"
          ranges={[
            {
              label: 'Now',
              value: moment(),
            },
          ]}
        />
      </Demo>
    );
  },
}));

stories.add('date', () => ({
  render() {
    return (
      <Demo title="Date">
        <DatePicker style={{ width: '280px' }} format="YYYY-MM" ranges={[]} />
      </Demo>
    );
  },
}));

stories.add('time', () => ({
  render() {
    return (
      <Demo title="Time">
        <p>显示时间</p>
        <DatePicker style={{ width: '280px' }} format="HH:mm:ss" ranges={[]} />
        <hr />
        <p>只显示小时与分钟</p>
        <DatePicker style={{ width: '280px' }} format="HH:mm" ranges={[]} />
      </Demo>
    );
  },
}));

stories.add('isoWeek', () => ({
  render() {
    return (
      <Demo title="ISO Week">
        <DatePicker style={{ width: '280px' }} isoWeek />
      </Demo>
    );
  },
}));

stories.add('disabled & hidden', () => ({
  render() {
    return (
      <Demo title="Disabled & Hidden">
        <p>禁用组件</p>
        <DatePicker style={{ width: '280px' }} disabled />
        <hr />
        <p>禁用日期</p>
        <DatePicker
          style={{ width: '280px' }}
          disabledDate={date => date.isBefore(moment())}
        />
        <hr />
        <p>禁用时间</p>
        <DatePicker
          style={{ width: '280px' }}
          format="HH:mm:ss"
          ranges={[]}
          defaultValue={moment('2017-12-12 09:15:30')}
          disabledHours={hour => hour < 8 || hour > 18}
          disabledMinutes={minute => minute % 15 !== 0}
          disabledSeconds={second => second % 30 !== 0}
        />
        <hr />
        <p>隐藏时间</p>
        <DatePicker
          style={{ width: '280px' }}
          format="HH:mm:ss"
          ranges={[]}
          defaultValue={moment('2017-12-12 09:15:30')}
          hideHours={hour => hour < 8 || hour > 18}
          hideMinutes={minute => minute % 15 !== 0}
          hideSeconds={second => second % 30 !== 0}
        />
      </Demo>
    );
  },
}));

stories.add('placement', () => ({
  render(h) {
    return (
      <Demo title="Placement">
        <table id="customTable">
          <tbody>
            <tr>
              <td />
              <td>{this._renderDatePicker(h, 'bottom-start')}</td>
              <td>{this._renderDatePicker(h, 'bottom-end')}</td>
              <td />
            </tr>
            <tr>
              <td>{this._renderDatePicker(h, 'right-start')}</td>
              <td />
              <td />
              <td>{this._renderDatePicker(h, 'left-start')}</td>
            </tr>
            <tr>
              <td>{this._renderDatePicker(h, 'right-end')}</td>
              <td />
              <td />
              <td>{this._renderDatePicker(h, 'left-end')}</td>
            </tr>
            <tr>
              <td />
              <td>{this._renderDatePicker(h, 'top-start')}</td>
              <td>{this._renderDatePicker(h, 'top-end')}</td>
              <td />
            </tr>
          </tbody>
        </table>
      </Demo>
    );
  },

  methods: {
    _renderDatePicker(h, placement) {
      return <DatePicker placement={placement} placeholder={placement} />;
    },
  },
}));

stories.add('shortcut', () => ({
  render() {
    return (
      <Demo title="Shortcut">
        <DatePicker
          style={{ width: '280px' }}
          ranges={[
            {
              label: '昨天',
              value: moment().add(-1, 'd'),
            },
            {
              label: '今天',
              value: moment(),
            },
            {
              label: '前一天',
              closeOverlay: false,
              value: datePage => {
                return moment(datePage).add(-1, 'd');
              },
            },
          ]}
        />
      </Demo>
    );
  },
}));
