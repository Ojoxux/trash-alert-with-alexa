export interface TrashSchedule {
  id: string;
  day_of_week: string;
  trash_type: string;
  created_at: string;
  updated_at: string;
}

export type DayOfWeek =
  | 'sunday'
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday';

export interface TrashType {
  name: string;
  description: string;
}

export interface CollectionSchedule {
  trash_types: TrashType[];
}

export interface ScheduleResponse {
  trash_types: {
    name: string;
    description: string;
  };
  day_of_week: string[];
  week_number: number[] | null;
  schedule_type: 'weekly' | 'monthly';
}
