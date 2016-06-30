export class Event {
  constructor(public date: Date,
    public summary: string,
    public hasTime: boolean,
    public person: string
  ) { }
}