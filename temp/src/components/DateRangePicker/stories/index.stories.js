import { storiesOf } from '@storybook/vue';
import moment from 'moment';

import DateRangePicker from 'components/DateRangePicker';
import Demo from 'stories/demo';

const stories = storiesOf('Data Entry|DateRangePicker', module);

stories.add('default', () => ({
  render() {
    return (
      <Demo title="Default">
        <DateRangePicker style={{ width: '280px' }} />
      </Demo>
    );
  },
}));

stories.add('appearance', () => ({
  render() {
    return (
      <Demo title="Appearance">
        <DateRangePicker
          style={{ width: '280px' }}
          appearance="default"
          placeholder="Defult"
        />
        <hr />
        <DateRangePicker
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
        <DateRangePicker block />
      </Demo>
    );
  },
}));

stories.add('placeholder', () => ({
  render() {
    return (
      <Demo title="Placeholder">
        <DateRangePicker style={{ width: '280px' }} placeholder="选择日期" />
      </Demo>
    );
  },
}));

stories.add('hoverRange', () => ({
  render() {
    return (
      <Demo title="Hover Range">
        <p>选择整周</p>
        <DateRangePicker
          style={{ width: '280px' }}
          hoverRange="week"
          ranges={[]}
        />
        <hr />
        <p>选择整周，ISO 8601 标准， 每个日历星期从星期一开始，星期日为第7天</p>
        <DateRangePicker
          style={{ width: '280px' }}
          hoverRange="week"
          isoWeek
          ranges={[]}
        />
        <hr />
        <p>选择整月</p>
        <DateRangePicker
          style={{ width: '280px' }}
          hoverRange="month"
          ranges={[]}
        />
        <hr />
        <p>自定义选择</p>
        <DateRangePicker
          style={{ width: '280px' }}
          hoverRange={date => [
            date.clone().subtract(1, 'days'),
            date.clone().add(1, 'days'),
          ]}
          ranges={[]}
        />
      </Demo>
    );
  },
}));

stories.add('oneTap', () => ({
  render() {
    return (
      <Demo title="One Tap">
        <p>选择单日</p>
        <DateRangePicker
          style={{ width: '280px' }}
          oneTap
          ranges={[
            {
              label: 'today',
              value: [moment(), moment()],
            },
            {
              label: 'yesterday',
              value: [moment().add(1, 'd'), moment().add(1, 'd')],
            },
          ]}
        />
        <hr />
        <p>选择单周</p>
        <DateRangePicker
          style={{ width: '280px' }}
          oneTap
          hoverRange="week"
          ranges={[]}
        />
        <hr />
        <p>选择单月</p>
        <DateRangePicker
          style={{ width: '280px' }}
          oneTap
          hoverRange="month"
          ranges={[]}
        />
      </Demo>
    );
  },
}));

stories.add('disabled', () => ({
  render() {
    return (
      <Demo title="Disabled">
        <p>
          禁用组件: <code>disabled</code>
        </p>
        <DateRangePicker style={{ width: '280px' }} disabled />
        <hr />
        <p>
          禁用日期: <code>disabledDate</code>
        </p>
        <DateRangePicker
          style={{ width: '280px' }}
          defaultValue={[moment(), moment().add(10, 'd')]}
          disabledDate={date => date.isAfter(moment())}
        />
        <hr />
        <p>
          禁用日期: 控制选择范围 (不能大于今天, 同时时间跨度只能选择 5 天内)
        </p>
        <DateRangePicker
          style={{ width: '280px' }}
          disabledDate={(date, selectValue, selectedDone, type) => {
            // 如果大于今天则禁用
            if (date.isAfter(moment(), 'd')) {
              return true;
            }

            /**
             * 当只选择了一个时间时
             * 判断选择的时间前后超过5天的时间都禁用
             */
            if (
              type === 'CALENDAR' &&
              selectValue &&
              selectValue[0] &&
              !selectedDone &&
              (selectValue[0]
                .clone()
                .add(-5, 'd')
                .isAfter(date, 'd') ||
                selectValue[0]
                  .clone()
                  .add(5, 'd')
                  .isBefore(date, 'd'))
            ) {
              return true;
            }

            return false;
          }}
        />
      </Demo>
    );
  },
}));

stories.add('shortcut', () => ({
  render() {
    return (
      <Demo title="Shortcut">
        <DateRangePicker
          style={{ width: '280px' }}
          ranges={[
            {
              label: '昨天',
              value: [moment().add(-1, 'd'), moment().add(-1, 'd')],
            },
            {
              label: '今天',
              value: [moment(), moment()],
            },
            {
              label: '明天',
              value: [moment().add(1, 'd'), moment().add(1, 'd')],
            },
            {
              label: '最近 7 天',
              value: [moment().subtract(6, 'days'), moment()],
            },
          ]}
        />
      </Demo>
    );
  },
}));

stories.add('controlled', () => ({
  render() {
    return (
      <Demo title="Controlled">
        <DateRangePicker
          style={{ width: '280px' }}
          visible
          value={[moment(), moment().add(1, 'day')]}
        />
      </Demo>
    );
  },
}));
