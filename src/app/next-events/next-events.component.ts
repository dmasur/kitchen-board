import { Component } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';
import { AppointmentsService, NextEventsService } from '../services/index';
import { TimeAgoPipe, DateFormatPipe } from 'angular2-moment';
import { Observable } from 'rxjs/Rx';
import { Settings } from '../shared/settings';
import { BasePanel } from '../shared/basePanel';
import { Day } from './shared/day'
import IEvent = gapi.client.calendar.IEvent;

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

  constructor(private appointmentsService: AppointmentsService, protected cookieService: CookieService, private settings: Settings, private nextEventsService:NextEventsService) {
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

  rowClass(day: Day): string {
    if (day === undefined) {
      return "";
    }
    var today = new Date();
    var tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)
    var dateString = NextEventsService.dateString(new Date(day.date.toString()));
    if (dateString == NextEventsService.dateString(today)) {
      return "success";
    } else if (dateString == NextEventsService.dateString(tomorrow)) {
      return "info";
    } else {
      return "";
    }
  }

  refreshData() {
    this.appointmentsService.loadAppointments().then(appointments => {
      this.daysWithEvents = this.nextEventsService.getDays(appointments).slice(0, 4);
      this.saveData(this.daysWithEvents);
    });
  }
}
