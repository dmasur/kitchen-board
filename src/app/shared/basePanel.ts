import { OnInit } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';

export abstract class BasePanel implements OnInit {
  public loaded:boolean=true;
  public lastUpdate:Date;
  public errorMessage:string;

  constructor(protected name:string, private refreshAfter:number, protected cookieService:CookieService){}

  ngOnInit() {
    this.loadSavedData();
    if(this.enabled()){
      this._refreshData();
      setInterval(() => this._refreshData(), this.refreshAfter * 1000)
    }
  }

  abstract refreshData()

  _refreshData(){
    try{
      this.refreshData();
    }catch(e){
      if(e instanceof String){
        this.errorMessage = e;
      }else{
        this.errorMessage = e.message;
      }
    }
  }

  loadSavedData(){
    var rawSavedAt = this.cookieService.get(this.name+'.savedAt');
    var rawData = this.cookieService.get(this.name+'.data');
    if(rawSavedAt !== undefined && rawData !== undefined){
      this.lastUpdate = JSON.parse(rawSavedAt);
      return JSON.parse(rawData);
    }
  }

  saveData(data:any){
    this.lastUpdate = new Date();
    this.cookieService.put(this.name + '.data', JSON.stringify(data));
    this.cookieService.put(this.name + '.savedAt', JSON.stringify(this.lastUpdate));
  }

  abstract enabled():boolean
}