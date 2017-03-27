import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { DateFormatPipe } from 'angular2-moment';

@Component({
  moduleId: module.id,
  selector: 'app-clock',
  templateUrl: 'clock.component.html',
  styleUrls: ['clock.component.css']
})
export class ClockComponent implements OnInit, OnDestroy {
  public dateTime: Date;
  private timerObserver: any;

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnInit() {
    const timer = Observable.timer(0, 1000);
    this.timerObserver = timer.subscribe(() => this.updateTime());
  }

  updateTime() {
    this.dateTime = new Date();
    this.cdRef.detectChanges();
  }

  ngOnDestroy() {
      this.timerObserver.unsubscribe();
  }
}
