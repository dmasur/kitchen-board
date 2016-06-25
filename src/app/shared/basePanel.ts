import { OnInit } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';

export abstract class BasePanel implements OnInit {
  public loaded:boolean=true;
  public lastUpdate:Date;

  constructor(protected name:string, private refreshAfter:number, protected cookieService:CookieService){}

  ngOnInit() {
    this.loadSavedData();
    if(this.enabled()){
      this.refreshData();
      setInterval(() => this.refreshData(), this.refreshAfter * 1000)
    }
  }

  abstract refreshData()

  loadSavedData(){
    var rawSavedAt = this.cookieService.get(this.name+'.savedAt');
    var rawData = this.cookieService.get(name+'.data');
    if(rawSavedAt !== undefined && rawData !== undefined){
      this.lastUpdate = JSON.parse(rawSavedAt);
      return JSON.parse(rawData);
    }
  }

  saveData(data:any){
    this.lastUpdate = new Date();
    this.cookieService.put(name + '.data', JSON.stringify(data));
    this.cookieService.put(name + '.savedAt', JSON.stringify(this.lastUpdate));
  }

  abstract enabled():boolean
}