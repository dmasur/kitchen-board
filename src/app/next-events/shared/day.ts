import { Event } from './event';

export class Day {
  events: Array<Event> = [];
  date: Date;

  constructor(date: Date) {
    this.date = date;
  }
}
