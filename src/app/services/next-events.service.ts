import { Event } from '../next-events/shared/event';
import { Day } from '../next-events/shared/day';
import { Injectable } from '@angular/core';
import { AppointmentsService } from './appointments.service';
import IEvent = gapi.client.calendar.IEvent;

@Injectable()
export class NextEventsService {
  static dateToString(date: Date): string {
    return date.getFullYear().toString() + date.getMonth().toString() + date.getDate().toString();
  }

  constructor(private appointmentsService: AppointmentsService) { }

  public getDaysWithEvents(count, callback): void {
    this.appointmentsService.loadAppointments().then(appointments => {
      const daysWithEvents = this.getDaysWithEventsFromAppointments(appointments).slice(0, count);
      callback(daysWithEvents);
    });
  }

  private getDaysWithEventsFromAppointments(appointments): Array<Day> {
    const events: Array<Event> = this.getEvents(appointments);
    const days: Array<Day> = [];
    events.forEach(event => {
      const date: Date = event.date;
      if (date.toString() === 'NaN') { return; };
      this.addDayToArrayIfNeeded(date, days);
      const day = this.findDayForDate(date, days);
      day.events.push(event);
    });
    return days;
  }

  public getEvents(appointments): Array<Event> {
    return (appointments as Array<IEvent>)
      .filter(eventItem => eventItem.start !== undefined)
      .map(eventItem => { return this.createEventFromIEvent(eventItem); })
      .sort((a, b) => a.date.getTime() - b.date.getTime());
  }

  private createEventFromIEvent(eventItem: IEvent) {
    const hasTime = eventItem.start.dateTime !== undefined;
    const date = hasTime ? eventItem.start.dateTime : eventItem.start.date;
    let displayName = eventItem.creator.displayName;
    if (displayName.includes('webcal')) { displayName = null; }
    return new Event(new Date(date), eventItem.summary, hasTime, displayName);
  }

  private addDayToArrayIfNeeded(date: Date, days: Array<Day>) {
    const newDays: Array<Day> = days;
    const day: Day = this.findDayForDate(date, days);
    if (day == null) {
      newDays.push(new Day(date));
    }
  }

  private findDayForDate(date: Date, days: Array<Day>): Day {
    return days.find(day => (NextEventsService.dateToString(day.date) === NextEventsService.dateToString(date)));
  }
}
