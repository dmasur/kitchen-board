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