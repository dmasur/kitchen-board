import { Component } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';
import { AppointmentsService } from '../services/index';
import { TimeAgoPipe, DateFormatPipe } from 'angular2-moment';
import { Observable } from 'rxjs/Rx';
import { Settings } from '../shared/settings';
import { BasePanel } from '../shared/basePanel';
import IEvent = gapi.client.calendar.IEvent;

class Day {
  events: Array<IEvent> = [];
  date: Date;
}

class Event {
  constructor(public date: Date,
    public summary: string,
    public hasTime: boolean,
    public person: string
  ) { }
}

@Component({
  moduleId: module.id,
  selector: 'app-next-events',
  pipes: [TimeAgoPipe, DateFormatPipe],
  templateUrl: 'next-events.component.html',
  styleUrls: ['next-events.component.css'],
  providers: [AppointmentsService],
  inputs: ['onlineStatus']
})
export class NextEventsComponent extends BasePanel {
  daysWithEvents: Array<Day>;
  private onlineStatus: string;

  constructor(private appointmentsService: AppointmentsService, protected cookieService: CookieService, private settings: Settings) {
    super('nextEvents', 10 * 60, cookieService);
  }

  enabled(): boolean {
    return this.settings.googleApiKey != null &&
      this.settings.googleClientId != null &&
      this.onlineStatus == "online" &&
      gapi !== undefined
  }

  loadSavedData() {
    this.daysWithEvents = super.loadSavedData() as Array<Day>;
  }

  dateString(date: Date): string {
    return date.getFullYear().toString() + date.getMonth().toString() + date.getDate().toString();
  }

  rowClass(day: Day): string {
    if (day === undefined) {
      return "";
    }
    var today = new Date();
    var tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)
    var dateString = this.dateString(new Date(day.date.toString()));
    if (dateString == this.dateString(today)) {
      return "success";
    } else if (dateString == this.dateString(tomorrow)) {
      return "info";
    } else {
      return "";
    }
  }

  refreshData() {
    /*
     * loading the appointments is done asychronously. the service's loadAppointments() method
     * returns a Promise that provides access to the newly loaded set of appointments. Updating
     * the array of appointments triggers angular's one-way-binding between the field and the
     * widget.
     */
    this.appointmentsService.loadAppointments().then(appointments => {
      var events = [];
      this.daysWithEvents = [];
      var eventList = (appointments as Array<IEvent>);
      for (var i = 0; i < eventList.length; i++) {
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
      events = events.sort((a, b) => a.date.getTime() - b.date.getTime());
      var days: Array<Day> = [];
      for (var i = 0; i < events.length; i++) {
        var day: Day = days.find(day => (this.dateString(day.date) == this.dateString(events[i].date)));
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
      this.daysWithEvents = days.slice(0, 4);
      this.saveData(this.daysWithEvents);
    });
  }
}
