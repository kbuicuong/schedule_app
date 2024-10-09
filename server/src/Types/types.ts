export type ScheduleType = {
  id: number | string;
  event_id: string | number;
  title: string;
  description: string;
  start: Date | string;
  end: Date | string;
};
