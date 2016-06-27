import { Component } from '@angular/core';
import { DateFormatPipe } from 'angular2-moment';
import { BasePanel } from '../shared/basePanel';
import { CookieService } from 'angular2-cookie/core';

class CalendarService {
    static getDayCountOfMonth(date: Date): number {
      return new Date(date.getFullYear(), date.getMonth(), 0).getDate();
    }

    static getFirstDayNumber(date: Date): number {
      var firstDayNumber = date.getDay() - 1;

      if (firstDayNumber == -1) {
        firstDayNumber == 7;
      }
      return firstDayNumber;
    }

    static getDateString(date: Date): string {
      return date.getFullYear().toString() + date.getMonth().toString() + date.getDay().toString();
    }

    static isToday(date: Date){
      var today = new Date();
      return date.getDate() == today.getDate() && date.getMonth() == today.getMonth();
    }

    static isWeekend(date: Date){
      var weekday = date.getDay();
      return weekday == 0 || weekday == 6;
    }

    static getDaysArray(date: Date) {
      var days = [];
      var year = date.getFullYear();
      var month = date.getMonth();
      var dayCountOfMonth = CalendarService.getDayCountOfMonth(date);
      var firstDayNumber = CalendarService.getFirstDayNumber(date);
      var offset = firstDayNumber;
      for (var i = 0 + offset; i < dayCountOfMonth + offset - 1; i++) {
        var row = Math.floor(i / 7);
        days[row] = days[row] || [];
        days[row][i % 7] = new Date(year, month, i - offset + 1);
      }
      return days;
    }
}

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
