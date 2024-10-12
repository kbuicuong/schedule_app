class Schedule {
  id: number | string;
  event_id: string | number;
  title: string;
  subtitle: string;
  start: Date | string;
  end: Date | string;
  approved: boolean;

  constructor(
    id: number | string,
    event_id: number | string,
    name: string,
    subtitle: string,
    start_time: Date | string,
    end_time: Date | string,
    approved: boolean,
  ) {
    (this.id = id),
      (this.event_id = event_id),
      (this.title = name),
      (this.subtitle = subtitle),
      (this.start = start_time),
      (this.end = end_time),
      (this.approved = approved);
  }
}

export default Schedule;
