import { Injectable } from '@angular/core';
import { AuthenticationService, WaitService } from './index';
import ICalendarListEntry = gapi.client.calendar.ICalendarListEntry;
import IEvent = gapi.client.calendar.IEvent;

@Injectable()
export class AppointmentsService {
  constructor(private authenticationService: AuthenticationService) {
  }

  getAllCalendars(): Promise<Array<ICalendarListEntry>> {
    return WaitService.waitForTrue(this.authenticationService, 'isAuthenticated')
      .then(() => {
        return new Promise((resolve, reject) => {
          gapi.client.load('calendar', 'v3', () => {
            gapi.client.calendar.calendarList.list({}).execute((data) => {
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
