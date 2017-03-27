/// <reference path="../../../node_modules/@types/gapi/index.d.ts" />
/// <reference path="../../../node_modules/@types/gapi.calendar/index.d.ts" />

import { Injectable } from '@angular/core';
import { AuthenticationService, WaitService } from './index';
import CalendarListEntry = gapi.client.calendar.CalendarListEntry;
import Event = gapi.client.calendar.Event;
import Events = gapi.client.calendar.Events;
import Calendar = gapi.client.calendar.Calendar;

@Injectable()
export class AppointmentsService {
  constructor(private authenticationService: AuthenticationService) {
  }

  private getAllCalendars(): Promise<Array<CalendarListEntry>> {
    return WaitService.waitForTrue(this.authenticationService, 'isAuthenticated')
      .then(() => {
        return new Promise((resolve, reject) => {
          gapi.client.load('calendar', 'v3', () => {
            gapi.client.calendar.calendarList.list({}).execute(jsonResp => resolve(jsonResp.items));
          });
        }).catch((reason: any) => {
          console.log('getAllCalendars Error: ');
          console.log(reason);
        });
      });
  }

  private getEvents(calendarListEntry: CalendarListEntry): Promise<Event[]> {
    return new Promise<Event[]>((resolve, reject) => {
      gapi.client.calendar.events.list({
        'calendarId': calendarListEntry.id,
        'timeMin': (new Date()).toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': 10,
        'orderBy': 'startTime'
      }).execute((events) => resolve(events.items));
    });
  };

  public loadAppointments() {
    return new Promise((resolve, reject) => {
      this.getAllCalendars().then(calendars => {
        const eventPromises = calendars.map(calendar => { return this.getEvents(calendar); });
        Promise.all(eventPromises).then(function (result) {
          resolve([].concat.apply([], result));
        });
      });
    }).catch((reason: any) => {
      console.log('loadApppointment Error: ' + reason);
    });
  }
}
