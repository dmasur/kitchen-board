import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { DateFormatPipe } from 'angular2-moment';
import * as moment from 'moment';
import { BasePanel } from '../shared/basePanel';
import { CookieService } from 'angular2-cookie/core';

class ClassInfo{
  constructor(public time:string, public subject:string) {}
}
class Schedule{
  constructor(public displayedDate:Date, public classInfos:Array<ClassInfo>) {}
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
  times = ["8:00 - 9:00", "9:10 - 10:10", "10:25 - 11:25", "11:35 - 12:35", "12:50 - 13:50"]
  schedule:Schedule;

  constructor(protected cookieService: CookieService) {
    super("schedule", 5 * 60, cookieService);
  }

  enabled():boolean{
    return true;
  }

  timeTableHasClasses(date:Date):boolean{
    return this.timeTable[date.getDay()].length > 0
  }

  getNextDay(day:Date):Date{
    return new Date(day.getTime() + 24 * 60 * 60 * 1000);
  }

  getDisplayedDate(currentDate: Date):Date{
    var displayedDay:Date;
    if(currentDate.getHours() >= 12){
      displayedDay = this.getNextDay(currentDate);
    }else{
      displayedDay = currentDate;
    }
    while(!this.timeTableHasClasses(displayedDay)){
      displayedDay = this.getNextDay(displayedDay);
    }
    return displayedDay;
  }

  getClassInfos(times, timeTable, date){
    return timeTable[date.getDay()].map((e, i) => new ClassInfo(times[i], e));
  }

  refreshData() {
    var displayedDay = this.getDisplayedDate(new Date());
    var classInfos = this.getClassInfos(this.times, this.timeTable, displayedDay);
    this.schedule = new Schedule(displayedDay, classInfos);
    this.saveData(this.schedule);
  };

}
