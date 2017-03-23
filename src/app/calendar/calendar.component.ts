import { Component, Input, OnInit } from '@angular/core';
import { DateFormatPipe } from 'angular2-moment';
import { BasePanel } from '../shared/basePanel';
import { CalendarService, AppointmentsService, NextEventsService } from '../services';
import { CookieService } from 'angular2-cookie/core';
import { Calendar, CalendarDay } from './shared/calendar';
import { Event } from '../next-events/shared/event';
import { Settings } from '../shared/settings';

@Component({
  moduleId: module.id,
  selector: 'app-calendar',
  templateUrl: 'calendar.component.html',
  styleUrls: ['calendar.component.css']
})
export class CalendarComponent extends BasePanel implements OnInit {
  @Input() private dateString: string;
  date: Date = new Date();
  calendar: Calendar = new Calendar();
  @Input() private onlineStatus: string;

  constructor(protected cookieService: CookieService,
    private calendarService: CalendarService,
    private appointmentsService: AppointmentsService,
    private nextEventsService: NextEventsService,
    private settings: Settings) {
    super('calendar', 60 * 60, cookieService);
  }

  ngOnInit() {
    this.date = new Date(Date.parse(this.dateString));
    super.ngOnInit();
  }

  refreshData() {
    this.appointmentsService.loadAppointments().then(appointments => {
      this.calendar = this.calendarService.getCalendar(this.date, this.nextEventsService.getEvents(appointments));
      this.saveData(this.calendar);
    });
  }

  loadSavedData() {
    this.calendar = this.calendarService.getCalendar(this.date, []);
  }

  getTextClass(day: CalendarDay): string {
    if (day === undefined) {
      return '';
    }
    if (day.hasEvents) {
      return 'label label-default';
    }
    return '';
  }

  getDayClass(day: CalendarDay): string {
    if (day === undefined) {
      return '';
    }
    if (day.hasEvents) {
      return 'success';
    }
    if (CalendarService.isToday(day.date)) {
      return 'danger';
    }
    if (CalendarService.isWeekend(day.date)) {
      return 'info';
    }
    return '';
  }

  enableConditions(): {} {
    return {
      googleApiKey: this.settings.googleApiKey != null,
      googleClientId: this.settings.googleClientId != null,
      onlineStatus: this.onlineStatus === 'online',
      gapi: typeof (gapi) !== 'undefined'
    };
  }
}
