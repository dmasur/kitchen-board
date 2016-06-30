export class CalendarDay {
  date: Date;
  hasEvents: boolean;
}

export class Calendar {
  date: Date;
  days: Array<Array<CalendarDay>> = [];
}