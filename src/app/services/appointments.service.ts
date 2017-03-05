import { Injectable } from '@angular/core';
import { AuthenticationService, WaitService } from './index';
import ICalendarListEntry = gapi.client.calendar.ICalendarListEntry;
import IEvent = gapi.client.calendar.IEvent;

@Injectable()
export class AppointmentsService {
  constructor(private authenticationService: AuthenticationService) {
  }

  getAllCalendars() {
    if (!this.authenticationService.isAuthenticated) { return; };
    if (gapi.client === undefined) { return; };
    return new Promise((resolve, reject) => {
      gapi.client.load('calendar', 'v3', function () {
        const request2 = gapi.client.calendar.calendarList.list({});
        request2.execute((data) => {
          if (!data.error) {
            resolve(data.result.items);
          } else {
            reject(data.error);
          }
        });
      });
    }).catch((reason: any) => {
      console.log('getAllCalendars Error: ' + reason);
    });
  }

  getEvents(calendar) {
    return new Promise((resolve, reject) => {
      gapi.client.calendar.events.list({
        'calendarId': calendar.id,
        'timeMin': (new Date()).toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': 10,
        'orderBy': 'startTime'
      }).execute((resp) => {
        resolve(resp.result.items);
      });
    }).catch((reason: any) => {
      console.log('getEvents Error: ' + reason);
    });
  };

  loadAppointments() {
    return new Promise((resolve, reject) => {
      const calendarPromise = this.getAllCalendars();
      if (calendarPromise === undefined) { return; }
      calendarPromise.then(calendars => {
        if (calendars === undefined) { return; }
        const eventPromises = (calendars as Array<ICalendarListEntry>).map(calendar => { return this.getEvents(calendar); });
        Promise.all(eventPromises).then(function (result) {
          resolve([].concat.apply([], result));
        });
      });
    }).catch((reason: any) => {
      console.log('loadApppointment Error: ' + reason);
    });
  }
}
