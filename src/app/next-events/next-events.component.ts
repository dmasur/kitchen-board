/// <reference path="../../../typings/globals/gapi.client/gapi.client.calendar.d.ts" />

import { Component, Input } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';
import { AppointmentsService, NextEventsService } from '../services/index';
import { Observable } from 'rxjs/Rx';
import { Settings } from '../shared/settings';
import { BasePanel } from '../shared/basePanel';
import { Day } from './shared/day';
import IEvent = gapi.client.calendar.IEvent;

@Component({
  selector: 'app-next-events',
  templateUrl: 'next-events.component.html',
  styleUrls: ['next-events.component.css'],
  providers: [AppointmentsService]
})
export class NextEventsComponent extends BasePanel {
  daysWithEvents: Array<Day>;
  @Input() onlineStatus: string;

  constructor(private appointmentsService: AppointmentsService, protected cookieService: CookieService, private settings: Settings, private nextEventsService: NextEventsService) {
    super('nextEvents', 10 * 60, cookieService);
  }

  enableConditions(): {} {
    return {
      googleApiKey: this.settings.googleApiKey != null,
      googleClientId: this.settings.googleClientId != null,
      onlineStatus: this.onlineStatus === 'online',
      gapi: typeof (gapi) !== 'undefined'
    }
  }

  loadSavedData(): void {
    this.daysWithEvents = super.loadSavedData() as Array<Day>;
  }

  rowClass(day: Day): string {
    if (day === undefined) {
      return '';
    }
    const today = new Date();
    const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)
    const dateString = NextEventsService.dateToString(new Date(day.date.toString()));
    if (dateString === NextEventsService.dateToString(today)) {
      return 'success';
    } else if (dateString === NextEventsService.dateToString(tomorrow)) {
      return 'info';
    } else {
      return '';
    }
  }

  refreshData(): void {
    this.appointmentsService.loadAppointments().then(appointments => {
      this.daysWithEvents = this.nextEventsService.getDaysWithEvents(appointments).slice(0, 4);
      this.saveData(this.daysWithEvents);
    });
  }
}
