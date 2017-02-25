import { Event } from '../next-events/shared/event'
import { Day } from '../next-events/shared/day'
import { Injectable } from '@angular/core';
import IEvent = gapi.client.calendar.IEvent;

@Injectable()
export class NextEventsService{
    static dateString(date: Date): string {
      return date.getFullYear().toString() + date.getMonth().toString() + date.getDate().toString();
    }

    getEvents(appointments):Array<Event>{
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

    getDays(appointments):Array<Day>{
      var events:Array<Event> = this.getEvents(appointments);
      var days: Array<Day> = [];
      for (var i = 0; i < events.length; i++) {
        var day: Day = days.find(day => (NextEventsService.dateString(day.date) == NextEventsService.dateString(events[i].date)));
        if (day == null) {
          day = new Day();
          day.date = events[i].date;
          day.events = [];
          day.events.push(events[i]);
          if (day.date.toString() != "NaN") {
            days.push(day);
          }
        } else {
          day.events.push(events[i]);
        }
      }
      return days;
    }
}