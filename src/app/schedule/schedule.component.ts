import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { DateFormatPipe } from 'angular2-moment';
import * as moment from 'moment';
import { BasePanel } from '../shared/basePanel';
import { CookieService } from 'angular2-cookie/core';
import { ClassDuration } from './shared/classDuration';
import { Settings } from '../shared/settings';

class ClassInfo {
  constructor(public classDuration: ClassDuration, public subject: string) { }
}

class Schedule {
  constructor(public displayedDate: Date, public classInfos: Array<ClassInfo>) { }
}

@Component({
  selector: 'app-schedule',
  templateUrl: 'schedule.component.html',
  styleUrls: ['schedule.component.css']
})
export class ScheduleComponent extends BasePanel {
  schedule: Schedule;
  classDurations: Array<ClassDuration>;

  constructor(protected cookieService: CookieService, private settings: Settings) {
    super('schedule', 5 * 60, cookieService);
    this.schedule = new Schedule(new Date(), null);
    this.classDurations = ClassDuration.importFromClassDurationNumbers(settings.classDurationNumbers);
  }

  enableConditions(): {} {
    return {
      isEnabled: this.settings.enableSchedule !== undefined && this.settings.enableSchedule,
      hasClassDurations: this.classDurations !== undefined
    };
  }

  timeTableHasClasses(date: Date): boolean {
    return this.settings.timeTable[date.getDay()].length > 0;
  }

  getNextDay(day: Date): Date {
    return new Date(day.getTime() + 24 * 60 * 60 * 1000);
  }

  getDisplayedDate(currentDate: Date, withLog: boolean = false): Date {
    let displayedDay: Date;
    if (currentDate > this.classDurations[this.classDurations.length - 1].to) {
      if (withLog) {
        console.log('Scheduler: Display next date', currentDate, this.classDurations[this.classDurations.length - 1].to);
      }
      displayedDay = this.getNextDay(currentDate);
    } else {
      if (withLog) {
        console.log('Scheduler: Display this date', currentDate, this.classDurations[this.classDurations.length - 1].to);
      }
      displayedDay = currentDate;
    }
    while (!this.timeTableHasClasses(displayedDay)) {
      if (withLog) {
        console.log('Skip this day: no scheudle');
      }
      displayedDay = this.getNextDay(displayedDay);
    }
    return displayedDay;
  }

  getClassInfos(classDurations, timeTable, date) {
    return timeTable[date.getDay()].map((e, i) => new ClassInfo(classDurations[i], e));
  }

  refreshData() {
    const displayedDay = this.getDisplayedDate(new Date(), true);
    const classInfos = this.getClassInfos(this.classDurations, this.settings.timeTable, displayedDay);
    this.schedule = new Schedule(displayedDay, classInfos);
    this.saveData(this.schedule);
  }

  getClassInfoClass(classDuration: ClassDuration): string {
    if (this.isDateInClassDuration(new Date(), classDuration)) {
      return 'info';
    } else {
      return '';
    }
  }

  private isDateInClassDuration(date: Date, classDuration: ClassDuration): boolean {
    return date === this.getDisplayedDate(date) && date > classDuration.from && date < classDuration.to;
  }

}
