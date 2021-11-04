import { IWeek } from '../interfaces';
import { rounder } from './rounder';

export function weekAverager(weekData: []): any {
  const week: any = [
    { x: 'Mon', y: 0 },
    { x: 'Tu', y: 0 },
    { x: 'We', y: 0 },
    { x: 'Thu', y: 0 },
    { x: 'Fr', y: 0 },
    { x: 'Sun', y: 0 },
    { x: 'Sat', y: 0 },
  ];
  weekData.map((item: Array<number>, idx: number) => {
    if (idx <= 23) week[0].y += item[1];
    if (idx > 23 && idx <= 47) week[1].y += item[1];
    if (idx > 47 && idx <= 71) week[2].y += item[1];
    if (idx > 71 && idx <= 95) week[3].y += item[1];
    if (idx > 95 && idx <= 119) week[4].y += item[1];
    if (idx > 119 && idx <= 143) week[5].y += item[1];
    if (idx > 143 && idx <= 167) week[6].y += item[1];
  });
  return week.map(({ x, y }) => {
    y = y / 24;
    return { x: x, y: rounder(y, 2) };
  });
}
