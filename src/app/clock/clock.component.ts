import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {DateFormatPipe} from 'angular2-moment';

@Component({
  moduleId: module.id,
  selector: 'app-clock',
  templateUrl: 'clock.component.html',
  styleUrls: ['clock.component.css'],
  pipes: [DateFormatPipe]
})
export class ClockComponent implements OnInit {
  dateTime: Date;
  constructor() {}

  ngOnInit() {
    this.updateTime();
    let observer = Observable.interval(1000);
    let subscription = observer.subscribe(x => {
      this.updateTime()
    });
  }

  updateTime(){
    this.dateTime = new Date();
  }

}
