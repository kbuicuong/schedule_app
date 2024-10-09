class Schedule {
  id: number|string;
  event_id: string | number;
  title: string;
  subtitle: string;
  start: Date | string;
  end: Date | string;

  constructor(id:number|string, event_id: number | string, name: string, subtitle: string, start_time: Date | string, end_time: Date | string) {
    (this.id = id),
    (this.event_id = event_id),
      (this.title = name),
      (this.subtitle = subtitle),
      (this.start = start_time),
      (this.end = end_time);
  }
}

export default Schedule;
