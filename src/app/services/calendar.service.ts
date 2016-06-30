import { Calendar, CalendarDay } from '../calendar/shared/calendar';
import { Injectable } from '@angular/core';
import { Event } from '../next-events/shared/event'

@Injectable()
export class CalendarService {

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
    var mm = date.getMonth() + 1; // getMonth() is zero-based
    var dd = date.getDate();

    return [date.getFullYear(), !mm[1] && '0', mm, !dd[1] && '0', dd].join(''); // padding
  }

  static isToday(date: Date){
    var today = new Date();
    return date.getDate() == today.getDate() && date.getMonth() == today.getMonth();
  }

  static isWeekend(date: Date){
    var weekday = date.getDay();
    return weekday == 0 || weekday == 6;
  }

  getCalendarDaysArray(date: Date, events: Array<Event>):Array<Array<CalendarDay>> {
    var days:Array<Array<CalendarDay>> = [];
    var year = date.getFullYear();
    var month = date.getMonth();
    var dayCountOfMonth = CalendarService.getDayCountOfMonth(date);
    var firstDayNumber = CalendarService.getFirstDayNumber(date);
    var offset = firstDayNumber;
    var eventDates = events.map(event => CalendarService.getDateString(event.date));
    for (var i = 0 + offset; i < dayCountOfMonth + offset - 1; i++) {
      var row = Math.floor(i / 7);
      days[row] = days[row] || [];
      var date = new Date(year, month, i - offset + 1);
      var calendarDay = new CalendarDay();
      calendarDay.date = date;
      calendarDay.hasEvents = eventDates.indexOf(CalendarService.getDateString(date)) != -1;
      days[row][i % 7] = calendarDay;
    }
    return days;
  }

  getCalendar(date: Date, events: Array<Event>):Calendar {
    var calendar = new Calendar();
    calendar.date = date;
    calendar.days = this.getCalendarDaysArray(date, events);
    return calendar;
  }
}