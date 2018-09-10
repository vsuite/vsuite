import { scrollTop } from 'shares/dom';
import requestAnimationFrame from 'shares/requestAnimationFrame';

export const shouldTime = format => /([Hhms])/.test(format);

export const shouldMonth = format => /Y/.test(format) && /M/.test(format);

export const shouldDate = format =>
  /Y/.test(format) && /M/.test(format) && /D/.test(format);

export const shouldOnlyTime = format =>
  /([Hhms])/.test(format) && !/([YMD])/.test(format);

export function getMonthView(monthDate, isoWeek) {
  let firstDayOfMonth = monthDate.day();
  let distance = 0 - firstDayOfMonth;

  if (isoWeek) {
    distance = 1 - firstDayOfMonth;

    if (firstDayOfMonth === 0) {
      distance = -6;
    }
  }

  let firstWeekendDate = monthDate.clone().add(distance, 'days');
  let weeks = [firstWeekendDate];
  let nextWeekendDate = firstWeekendDate.clone().add(7, 'days');

  weeks.push(nextWeekendDate);

  while (weeks.length < 6) {
    nextWeekendDate = nextWeekendDate.clone().add(7, 'days');
    weeks.push(nextWeekendDate);
  }

  return weeks;
}

export function scrollTopAnimation(
  target,
  nextTop,
  animation = true,
  callback
) {
  let top = scrollTop(target);

  const step = () => {
    scrollTop(target, top > nextTop ? nextTop : top);

    if (top <= nextTop) {
      requestAnimationFrame(step);
    }

    callback && callback(top);
    top += 20;
  };

  if (animation) {
    requestAnimationFrame(step);
  } else {
    scrollTop(target, nextTop);
  }
}
