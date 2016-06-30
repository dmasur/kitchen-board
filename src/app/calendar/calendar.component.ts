import { Component } from '@angular/core';
import { DateFormatPipe } from 'angular2-moment';
import { BasePanel } from '../shared/basePanel';
import { CalendarService } from '../services/index';
import { CookieService } from 'angular2-cookie/core';
import { Calendar, CalendarDay } from './shared/calendar';

@Component({
  moduleId: module.id,
  selector: 'app-calendar',
  templateUrl: 'calendar.component.html',
  styleUrls: ['calendar.component.css'],
  inputs: ['dateString'],
  pipes: [DateFormatPipe]
})
export class CalendarComponent extends BasePanel {
  dateString: string;
  date: Date;
  calendar: Calendar;

  constructor(protected cookieService: CookieService, private calendarService: CalendarService) {
    super('calendar', 60 * 60, cookieService);
  }

  ngOnInit() {
    this.date = new Date(Date.parse(this.dateString));
    super.ngOnInit()
  }

  refreshData() {
    this.calendar = this.calendarService.getCalendar(this.date);
    this.saveData(this.calendar);
  }

  loadSavedData() {
    this.calendar = super.loadSavedData();
  }

  getDayClass(day: CalendarDay): string {
    if (day === undefined) {
      return "";
    }
    if (CalendarService.isToday(day.date)) {
      return "danger";
    }
    if (CalendarService.isWeekend(day.date)) {
      return "info";
    }
    return "";
  }

  enabled() {
    return true;
  }
}
