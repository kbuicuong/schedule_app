class Config {
  id: number | string;
  nonWorkingDays: number[];

  constructor(
    id: number | string,
    nonWorkingDays: number[]
  ) {
    (this.id = id),
      (this.nonWorkingDays = nonWorkingDays)
  }
}

export default Config;
