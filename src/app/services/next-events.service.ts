import { Event } from '../next-events/shared/event'
import { Day } from '../next-events/shared/day'
import { Injectable } from '@angular/core';
import IEvent = gapi.client.calendar.IEvent;

@Injectable()
export class NextEventsService {
  static dateToString(date: Date): string {
    return date.getFullYear().toString() + date.getMonth().toString() + date.getDate().toString();
  }

  private getEvents(appointments): Array<Event> {
    var events = [];
    var eventList = (appointments as Array<IEvent>);
    for (var i = 0; i < appointments.length; i++) {
      if (eventList[i].start != undefined) {
        var hasTime = eventList[i].start.dateTime !== undefined;
        var date = hasTime ? eventList[i].start.dateTime : eventList[i].start.date;
        var displayName = eventList[i].creator.displayName;
        if (displayName.includes('webcal')) {
          displayName = null;
        }
        var event = new Event(new Date(date), eventList[i].summary, hasTime, displayName)
        events.push(event);
      }
    };
    return events.sort((a, b) => a.date.getTime() - b.date.getTime());
  }

  private addDayToArrayIfNeeded(date: Date, days: Array<Day>): Array<Day> {
    var newDays: Array<Day> = days;
    var day: Day = this.findDayForDate(date, days);
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
    var events: Array<Event> = this.getEvents(appointments);
    var days: Array<Day> = [];
    events.forEach(event => {
      var date: Date = event.date;
      if (date.toString() == "NaN") return;
      days = this.addDayToArrayIfNeeded(date, days);
      var day = this.findDayForDate(date, days);
      day.events.push(event);
    });
    return days;
  }
}