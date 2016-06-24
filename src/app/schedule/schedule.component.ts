import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {DateFormatPipe} from 'angular2-moment';
import * as moment from 'moment';

class ClassInfo{
  constructor(public time:string, public subject:string) {}
}

@Component({
  moduleId: module.id,
  selector: 'app-schedule',
  templateUrl: 'schedule.component.html',
  styleUrls: ['schedule.component.css'],
  pipes: [DateFormatPipe]
})

export class ScheduleComponent implements OnInit {
  schedule = [
    [],
    ["Mathe", "Sport", "Religon", "Englisch"],
    ["Biologie", "Deutsch", "SoWi", "Musik", "Kunst"],
    ["Englisch", "Kunst", "Instrument", "Sport", "Deutsch"],
    ["MINT", "Musik", "Mathe", "Religion", "Klassenleiterst."],
    ["Erdkunde", "Deutsch", "Englisch", "Biologie", "Sport"],
    []
  ]
  times = ["8:00 - 9:00", "9:10 - 10:10", "10:25 - 11:25", "11:35 - 12:35", "12:50 - 13:50"]
  timeTable = []
  displayedDate:Date = new Date();
  constructor() {
  }

  ngOnInit() {
    this.updateTimeTable();
    setInterval(() => this.updateTimeTable(), 10 * 60 * 1000)
  }

  scheduleHasClasses(date:Date):boolean{
    return this.schedule[date.getDay()].length > 0
  }

  getDisplayedDate(currentDate: Date):Date{
    var displayedDay:Date;
    if(currentDate.getHours() >= 12){
      displayedDay = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);
    }else{
      displayedDay = currentDate;
    }
    while(!this.scheduleHasClasses(displayedDay)){
      displayedDay = new Date(displayedDay.getTime() + 24 * 60 * 60 * 1000);
    }
    return displayedDay;
  }

  generateTimeTable(schedule:any, displayedDate:Date){
    return this.times.map((e, i) => new ClassInfo(e, schedule[displayedDate.getDay()][i]));
  }

  updateTimeTable = () => {
    this.displayedDate = this.getDisplayedDate(new Date());
    this.timeTable = this.generateTimeTable(this.schedule, this.displayedDate);
  };

}
