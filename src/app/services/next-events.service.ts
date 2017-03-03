import { Event } from '../next-events/shared/event'
import { Day } from '../next-events/shared/day'
import { Injectable } from '@angular/core';
import IEvent = gapi.client.calendar.IEvent;

@Injectable()
export class NextEventsService {
  static dateToString(date: Date): string {
    return date.getFullYear().toString() + date.getMonth().toString() + date.getDate().toString();
  }

  public getEvents(appointments): Array<Event> {
    const events = [];
    const eventList = (appointments as Array<IEvent>);
    for (let i = 0; i < appointments.length; i++) {
      if (eventList[i].start !== undefined) {
        const hasTime = eventList[i].start.dateTime !== undefined;
        const date = hasTime ? eventList[i].start.dateTime : eventList[i].start.date;
        let displayName = eventList[i].creator.displayName;
        if (displayName.includes('webcal')) {
          displayName = null;
        }
        const event = new Event(new Date(date), eventList[i].summary, hasTime, displayName)
        events.push(event);
      }
    };
    return events.sort((a, b) => a.date.getTime() - b.date.getTime());
  }

  private addDayToArrayIfNeeded(date: Date, days: Array<Day>): Array<Day> {
    const newDays: Array<Day> = days;
    let day: Day = this.findDayForDate(date, days);
    if (day == null) {
      day = new Day();
      day.date = date;
      day.events = [];
      newDays.push(day);
    }
    return newDays;
  }

  private findDayForDate(date: Date, days: Array<Day>): Day {
    return days.find(day => (NextEventsService.dateToString(day.date) == NextEventsService.dateToString(date)));
  }

  public getDaysWithEvents(appointments): Array<Day> {
    const events: Array<Event> = this.getEvents(appointments);
    let days: Array<Day> = [];
    events.forEach(event => {
      const date: Date = event.date;
      if (date.toString() === 'NaN') { return; };
      days = this.addDayToArrayIfNeeded(date, days);
      const day = this.findDayForDate(date, days);
      day.events.push(event);
    });
    return days;
  }
}