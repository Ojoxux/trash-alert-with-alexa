import { DayOfWeek } from '../types';

export function getCurrentDayOfWeek(date: Date = new Date()): DayOfWeek {
  const daysOfWeek: DayOfWeek[] = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ];

  return daysOfWeek[date.getDay()];
}
