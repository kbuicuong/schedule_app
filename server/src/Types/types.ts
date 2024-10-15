export type ScheduleType = {
  id: number | string;
  event_id: string | number;
  title: string;
  subtitle: string;
  description: string;
  email: string;
  phone: string;
  start: Date | string;
  end: Date | string;
  approved?: boolean;
};
