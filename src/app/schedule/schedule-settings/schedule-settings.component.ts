import { Component, OnInit } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';
import { Settings } from 'app/shared';
import { BaseSettings } from 'app/shared/baseSettings';

@Component({
  selector: 'app-schedule-settings',
  templateUrl: './schedule-settings.component.html',
  styleUrls: ['./schedule-settings.component.css']
})
export class ScheduleSettingsComponent extends BaseSettings implements OnInit {

  constructor(cookieService: CookieService, settings: Settings) {
    super(cookieService, settings);
  }

  ngOnInit() {
    this.settings = this.settings || new Settings();
    this.settings.timeTable = new Settings().timeTable;
    this.settings.classDurationNumbers = new Settings().classDurationNumbers;
  }

  addHourToSchedule() {
    this.settings.classDurationNumbers.push([[0, 0], [0, 0]]);
    for (let i = 0; i < 6; i++) {
      this.settings.timeTable[i].push('');
    }
    event.preventDefault();
  }

  removeHourFromSchedule() {
    this.settings.classDurationNumbers.pop();
    for (let i = 0; i < this.settings.timeTable.length; i++) {
      this.settings.timeTable[i].pop();
    }
    event.preventDefault();
  }

  hourArray(): Array<number> {
    return this.settings.classDurationNumbers.map((_, i) => i);
  }
}
