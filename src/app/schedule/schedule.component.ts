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
  times = ["8:00 - 9:00", "9:05 - 10:05", "10:20 - 11:20", "11:25 - 12:25", "12:50 - 13:50"]
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
