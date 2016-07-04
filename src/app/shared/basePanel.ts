import { OnInit } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';

export abstract class BasePanel implements OnInit {
  public loaded: boolean = true;
  public lastUpdate: Date;
  public errorMessage: string;

  constructor(protected name: string, private refreshAfter: number, protected cookieService: CookieService) { }

  ngOnInit() {
    this.loadSavedData();
    if (this.enabled()) {
      this._refreshData();
      setInterval(() => this._refreshData(), this.refreshAfter * 1000)
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
        this.errorMessage = e;
      } else {
        this.errorMessage = e.message;
      }
    }
  }

  loadSavedData() {
    this.log('loadSavedData started');
    var rawSavedAt = this.cookieService.get(`${this.name}.savedAt`);
    var rawData = this.cookieService.get(`${this.name}.data`);
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

  abstract enabled(): boolean

  log(message:string){
    //console.log(`${new Date()} ${this.name}: ${message}`);
  }
}