/// <reference path="../../../typings/globals/gapi.client/gapi.client.calendar.d.ts" />

import { Injectable } from '@angular/core';
import ICalendarListEntry = gapi.client.calendar.ICalendarListEntry;
import IEvent = gapi.client.calendar.IEvent;

@Injectable()
export class AppointmentsService {

  constructor() {
  }

  getAllCalendars() {
    if(gapi.client == undefined) return;
    return new Promise((resolve, reject) => {
      gapi.client.load('calendar', 'v3', function() {
        var request2 = gapi.client.calendar.calendarList.list({});
        request2.execute((data) => {
          if (!data.error) {
            resolve(data.result.items);
          } else {
            reject(data.error);
          }
        });
      });
    });
  }

  getEvents(calendar) {
    return new Promise((resolve, reject) => {
      var request = gapi.client.calendar.events.list({
        'calendarId': calendar.id,
        'timeMin': (new Date()).toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': 10,
        'orderBy': 'startTime'
      });

      request.execute((resp) => {
        var appointments = [];
        var events = resp.result.items;
        var i;
        if (events.length > 0) {
          for (i = 0; i < events.length; i++) {
            var event = events[i];
            var when = event.start.dateTime;
            if (!when) {
              when = event.start.date;
            }
            appointments.push(event)
          }
        }
        resolve(appointments);
      });
    }).catch((reason: any)=>{
      console.log("getEvents Error: "+reason);
    });
  };

  loadAppointments() {
    return new Promise((resolve, reject) => {
      var calendars = this.getAllCalendars()
      if(calendars == undefined) return;
      calendars.then(calendars => {
        var eventCalls = [];

        for (var i = 0; i < (calendars as Array<ICalendarListEntry>).length; i++) {
          eventCalls.push(this.getEvents(calendars[i]));
        }
        Promise.all(eventCalls).then(function(result) {
          resolve([].concat.apply([], result));
        });
      });
    }).catch((reason: any)=>{
      console.log("loadApppointment Error: "+reason);
    });
  }
}
