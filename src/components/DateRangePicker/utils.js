import moment from 'moment';

export function setTimingMargin(date, way = 'left') {
  return way === 'right'
    ? date
        .clone()
        .hours(23)
        .minutes(59)
        .seconds(59)
    : date
        .clone()
        .hours(0)
        .minutes(0)
        .seconds(0);
}

export function equalMoment(a, b, unit = 'day') {
  if (moment.isMoment(a) && moment.isMoment(b)) {
    return a.isSame(b, unit);
  }

  return a === b;
}

export function getCalendarDate(value = []) {
  const now = moment();
  let calendarDate = [now, now.clone().add(1, 'month')];

  // Update calendarDate if the value is not null
  if (value[0] && value[1]) {
    const isSameMonth = value[0].clone().isSame(value[1], 'month');

    calendarDate = [
      value[0],
      isSameMonth ? value[1].clone().add(1, 'month') : value[1].clone(),
    ];
  }

  return calendarDate;
}
