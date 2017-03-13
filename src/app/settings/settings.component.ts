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
  constructor(private cookieService: CookieService, private settings: Settings) {
  }

  ngOnInit() {
    this.settings = this.settings || new Settings();
  }

  addHourToSchedule(){
    this.settings.classDurationNumbers.push([[0, 0], [0, 0]])
    event.preventDefault();
  }

  removeHourFromSchedule(){
    this.settings.classDurationNumbers.pop()
    event.preventDefault();
  }

  hourArray():Array<number>{
    return this.settings.classDurationNumbers.map((_,i) => i)
  }

  onSubmit() {
    this.cookieService.putObject('settings', this.settings);
    window.location = '/';
  }
}
