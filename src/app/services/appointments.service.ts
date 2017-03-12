import { Injectable } from '@angular/core';
import { AuthenticationService, WaitService } from './index';
import ICalendarListEntry = gapi.client.calendar.ICalendarListEntry;
import IEvent = gapi.client.calendar.IEvent;

@Injectable()
export class AppointmentsService {
  constructor(private authenticationService: AuthenticationService) {
  }

  getAllCalendars(): Promise<Array<ICalendarListEntry>> {
    const calPromise = new Promise((resolve, reject) => {
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
      console.log('getAllCalendars Error: ');
      console.log(reason);
    });
    return WaitService.waitForTrue(this.authenticationService, 'isAuthenticated')
    .catch((reason: any) => {
      console.log('waitForTrue Error: ' + reason);
    })
    .then(() => {
      console.log(this.authenticationService.isAuthenticated);
      return calPromise;
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
      if (calendarPromise === undefined) { console.log("no calendarPromise"); return; }
      calendarPromise.then(calendars => {
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
