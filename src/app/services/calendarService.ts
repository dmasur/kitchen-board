import { Calendar, CalendarDay } from '../calendar/shared/calendar';
import { Injectable } from '@angular/core';
import { Event } from '../next-events/shared/event';

@Injectable()
export class CalendarService {

  static getDayCountOfMonth(date: Date): number {
    return new Date(date.getFullYear(), date.getMonth(), 0).getDate();
  }

  static getFirstDayNumber(date: Date): number {
    let firstDayNumber = date.getDay() - 1;

    if (firstDayNumber === -1) {
      firstDayNumber = 7;
    }
    return firstDayNumber;
  }

  static getDateString(date: Date): string {
    const mm = date.getMonth() + 1; // getMonth() is zero-based
    const dd = date.getDate();

    return [date.getFullYear(), !mm[1] && '0', mm, !dd[1] && '0', dd].join(''); // padding
  }

  static isToday(date: Date) {
    const today = new Date();
    return date.getDate() === today.getDate() && date.getMonth() === today.getMonth();
  }

  static isWeekend(date: Date) {
    const weekday = date.getDay();
    return weekday === 0 || weekday === 6;
  }

  getCalendarDaysArray(date: Date, events: Array<Event>): Array<Array<CalendarDay>> {
    const days: Array<Array<CalendarDay>> = [];
    const year = date.getFullYear();
    const month = date.getMonth();
    const dayCountOfMonth = CalendarService.getDayCountOfMonth(date);
    const firstDayNumber = CalendarService.getFirstDayNumber(date);
    const offset = firstDayNumber;
    const eventDates = events.map(event => CalendarService.getDateString(event.date));
    for (let i = 0 + offset; i < dayCountOfMonth + offset - 1; i++) {
      const row = Math.floor(i / 7);
      days[row] = days[row] || [];
      const newDate = new Date(year, month, i - offset + 1);
      const calendarDay = new CalendarDay();
      calendarDay.date = newDate;
      calendarDay.hasEvents = eventDates.indexOf(CalendarService.getDateString(newDate)) !== -1;
      days[row][i % 7] = calendarDay;
    }
    return days;
  }

  getCalendar(date: Date, events: Array<Event>): Calendar {
    const calendar = new Calendar();
    calendar.date = date;
    calendar.days = this.getCalendarDaysArray(date, events);
    return calendar;
  }
}
