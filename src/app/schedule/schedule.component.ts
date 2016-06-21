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
    ["Deutsch", "Mathe", "Englisch", "Sport", "Musik"],
    ["Deutsch", "Mathe", "Englisch", "Sport", "Musik"],
    ["Deutsch", "Mathe", "Englisch", "Sport", "Musik"],
    ["Deutsch", "Mathe", "Englisch", "Sport", "Musik"],
    ["Deutsch", "Mathe", "Englisch", "Sport", "Musik"],
    []
  ]
  times = ["8:00 - 8:45", "9:00 - 9:45", "10:00 - 10:45", "11:00 - 11:45", "12:00 - 12:45"]
  timeTable = []
  date:Date = new Date();
  constructor() {
  }

  ngOnInit() {
    this.updateTimeTable();
    let observer = Observable.interval(1000 * 60 * 60);
    let subscription = observer.subscribe(x => {
      this.updateTimeTable()
    });
  }

  updateTimeTable(){
    this.date = new Date();
    this.timeTable = this.times.map((e, i) => new ClassInfo(e, this.schedule[this.date.getDay()][i]));
  }

}
