import { Component } from '@angular/core';
import { DateFormatPipe } from 'angular2-moment';
import { BasePanel } from '../shared/basePanel';
import { CalendarService } from '../services/calendar.service';
import { CookieService } from 'angular2-cookie/core';

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
  days: Array<Array<number>>;

  constructor(protected cookieService: CookieService) {
    super('calendar', 60 * 60, cookieService);
  }

  ngOnInit() {
    this.date = new Date(Date.parse(this.dateString));
    super.ngOnInit()
  }

  refreshData() {
    this.days = CalendarService.getDaysArray(this.date);
    this.saveData(this.days);
  }

  loadSavedData() {
    this.days = super.loadSavedData();
  }

  getDayClass(day: any): string {
    if (day === undefined) {
      return "";
    }
    if (CalendarService.isToday(day)) {
      return "danger";
    }
    if (CalendarService.isWeekend(day)) {
      return "info";
    }
    return "";
  }

  enabled() {
    return true;
  }
}
