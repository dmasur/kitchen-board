/// <reference path="../../../typings/globals/gapi/index.d.ts" />
/// <reference path="../../../typings/globals/gapi.client/gapi.client.calendar.d.ts" />

import { Component } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';
import { AppointmentsService, NextEventsService } from '../services/index';
import { Observable } from 'rxjs/Rx';
import { Settings } from '../shared/settings';
import { BasePanel } from '../shared/basePanel';
import { Day } from './shared/day'
import IEvent = gapi.client.calendar.IEvent;

@Component({
  moduleId: module.id,
  selector: 'app-next-events',
  templateUrl: 'next-events.component.html',
  styleUrls: ['next-events.component.css'],
  providers: [AppointmentsService],
  inputs: ['onlineStatus']
})
export class NextEventsComponent extends BasePanel {
  daysWithEvents: Array<Day>;
  private onlineStatus: string;

  constructor(private appointmentsService: AppointmentsService, protected cookieService: CookieService, private settings: Settings, private nextEventsService:NextEventsService) {
    super('nextEvents', 10 * 60, cookieService);
  }

  enableConditions():{}{
    return {
      googleApiKey: this.settings.googleApiKey != null,
      googleClientId: this.settings.googleClientId != null,
      onlineStatus: this.onlineStatus == "online",
      gapi: typeof(gapi) !== 'undefined'
    }
  }

  loadSavedData():void {
    this.daysWithEvents = super.loadSavedData() as Array<Day>;
  }

  rowClass(day: Day): string {
    if (day === undefined) {
      return '';
    }
    const today = new Date();
    const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)
    const dateString = NextEventsService.dateString(new Date(day.date.toString()));
    if (dateString === NextEventsService.dateString(today)) {
      return 'success';
    } else if (dateString === NextEventsService.dateString(tomorrow)) {
      return 'info';
    } else {
      return '';
    }
  }

  refreshData():void {
    this.appointmentsService.loadAppointments().then(appointments => {
      this.daysWithEvents = this.nextEventsService.getDays(appointments).slice(0, 4);
      this.saveData(this.daysWithEvents);
    });
  }
}
