import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { DateFormatPipe } from 'angular2-moment';
import * as moment from 'moment';
import { BasePanel } from '../shared/basePanel';
import { CookieService } from 'angular2-cookie/core';

class ClassInfo {
  constructor(public classDuration: ClassDuration, public subject: string) { }
}

class Schedule {
  constructor(public displayedDate: Date, public classInfos: Array<ClassInfo>) { }
}

class ClassDuration {
  constructor(public from: Date, public to: Date) { }
}

function dateFromHourAndMinute(hour: number, minute: number): Date {
  var today = new Date();
  return new Date(today.getFullYear(), today.getMonth(), today.getDate(), hour, minute);
}

@Component({
  moduleId: module.id,
  selector: 'app-schedule',
  templateUrl: 'schedule.component.html',
  styleUrls: ['schedule.component.css'],
  pipes: [DateFormatPipe]
})
export class ScheduleComponent extends BasePanel {
  timeTable = [
    [],
    ["Mathe", "Sport", "Religon", "Englisch"],
    ["Biologie", "Deutsch", "SoWi", "Musik", "Kunst"],
    ["Englisch", "Kunst", "Instrument", "Sport", "Deutsch"],
    ["MINT", "Musik", "Mathe", "Religion", "Klassenleiterst."],
    ["Erdkunde", "Deutsch", "Englisch", "Biologie", "Sport"],
    []
  ]
  classDurations = [
    new ClassDuration(dateFromHourAndMinute(8, 0), dateFromHourAndMinute(9, 0)),
    new ClassDuration(dateFromHourAndMinute(9, 10), dateFromHourAndMinute(10, 10)),
    new ClassDuration(dateFromHourAndMinute(10, 25), dateFromHourAndMinute(11, 25)),
    new ClassDuration(dateFromHourAndMinute(11, 35), dateFromHourAndMinute(12, 35)),
    new ClassDuration(dateFromHourAndMinute(12, 50), dateFromHourAndMinute(13, 50))
  ]
  schedule: Schedule;

  constructor(protected cookieService: CookieService) {
    super("schedule", 5 * 60, cookieService);
  }

  enabled(): boolean {
    return true;
  }

  timeTableHasClasses(date: Date): boolean {
    return this.timeTable[date.getDay()].length > 0
  }

  getNextDay(day: Date): Date {
    return new Date(day.getTime() + 24 * 60 * 60 * 1000);
  }

  getDisplayedDate(currentDate: Date): Date {
    var displayedDay: Date;
    if (currentDate > this.classDurations[this.classDurations.length-1].to) {
      displayedDay = this.getNextDay(currentDate);
    } else {
      displayedDay = currentDate;
    }
    while (!this.timeTableHasClasses(displayedDay)) {
      displayedDay = this.getNextDay(displayedDay);
    }
    return displayedDay;
  }

  getClassInfos(classDurations, timeTable, date) {
    return timeTable[date.getDay()].map((e, i) => new ClassInfo(classDurations[i], e));
  }

  refreshData() {
    var displayedDay = this.getDisplayedDate(new Date());
    var classInfos = this.getClassInfos(this.classDurations, this.timeTable, displayedDay);
    this.schedule = new Schedule(displayedDay, classInfos);
    this.saveData(this.schedule);
  }

  getClassInfoClass(classDuration: ClassDuration): string {
    var currentTime = new Date();
    if (currentTime > classDuration.from && currentTime < classDuration.to) {
      return "info"
    } else {
      return "";
    }
  }

}
