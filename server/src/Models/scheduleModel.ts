class Schedule {

  id: number;
  name: string;
  description: string;
  time: Date;

  constructor(id:number, name:string, description:string, time:Date) {
    (this.id = id),
      (this.name = name),
      (this.description = description),
      (this.time = time);
  }
}

export default Schedule;
