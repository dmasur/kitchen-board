import { OnInit } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';

export abstract class BasePanel implements OnInit {
  public loaded = true;
  public lastUpdate: Date;
  public errorMessage: string;
  public isEnabled = false;

  constructor(protected name: string, private refreshAfter: number, protected cookieService: CookieService) { }

  ngOnInit() {
    this.loadSavedData();
    this.isEnabled = this.areEnabledConditionsMet();
    if (this.isEnabled) {
      this._refreshData();
      setInterval(() => this._refreshData(), this.refreshAfter * 1000);
    }
  }

  abstract refreshData()

  _refreshData() {
    try {
      this.log('refreshData started');
      this.refreshData();
      this.log('refreshData finished');
    } catch (e) {
      this.log('refreshData errored');
      if (e instanceof String) {
        this.errorMessage = 'Error';
      } else {
        this.errorMessage = e.message;
      }
    }
  }

  abstract enableConditions(): {}

  private areEnabledConditionsMet(): boolean {
    const conditions = this.enableConditions();
    const failingConditions = [];
    for (const conditionName in conditions) {
      if (conditions[conditionName] === false) {
        failingConditions.push(conditionName);
      }
    }
    if(failingConditions.length > 0) {
      console.log('ValidationErrors on ' + this.constructor.name + ': ' + failingConditions.toString());
    }
    return failingConditions.length === 0;
  }

  loadSavedData() {
    this.log('loadSavedData started');
    const rawSavedAt = this.cookieService.get(`${this.name}.savedAt`);
    const rawData = this.cookieService.get(`${this.name}.data`);
    if (rawSavedAt !== undefined && rawData !== undefined) {
      this.lastUpdate = JSON.parse(rawSavedAt);
      this.log('loadSavedData finished');
      return JSON.parse(rawData);
    }
    this.log('loadSavedData errored');
  }

  saveData(data: any) {
    this.lastUpdate = new Date();
    this.cookieService.put(`${this.name}.data`, JSON.stringify(data));
    this.cookieService.put(`${this.name}.savedAt`, JSON.stringify(this.lastUpdate));
  }

  log(message: string) {
    // console.log(`${new Date()} ${this.name}: ${message}`);
  }
}