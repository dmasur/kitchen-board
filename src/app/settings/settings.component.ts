import { Component, OnInit } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';
import { Settings } from '../shared/settings';
import { ClassDuration } from '../schedule/shared/classDuration';
declare var window: any;

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.component.html',
  styleUrls: ['settings.component.css']
})
export class SettingsComponent implements OnInit {
  constructor(private cookieService: CookieService, public settings: Settings) {
  }

  ngOnInit() {
    this.settings = this.settings || new Settings();
    debugger
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

  onSubmit() {
    this.cookieService.putObject('settings', this.settings);
    window.history.back();
  }
}
