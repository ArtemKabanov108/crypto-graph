import { toDateNowUnix } from './toDateNowUnix';

export function toWeekDiapason(): number {
  const MILLISECONDS_OF_WEEK = 604800;
  return toDateNowUnix() - MILLISECONDS_OF_WEEK;
}
