import { Component } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';
import { Http } from '@angular/http';
import { DateFormatPipe } from 'angular2-moment';
import { BasePanel } from '../shared/basePanel';
import * as moment from 'moment';

declare var $: any;

class Data {
  constructor(public humidity: string, public time: Date) { }
}

@Component({
  selector: 'app-humidor',
  templateUrl: 'humidor.component.html',
  styleUrls: ['humidor.component.css'],
  inputs: ['onlineStatus']
})

export class HumidorComponent extends BasePanel {
  public data: Data = new Data("N/A", new Date());
  private onlineStatus: string;

  constructor(protected cookieService: CookieService, private http: Http) {
    super('humidor', 60, cookieService); // every Hour
  }

  parse(data) {
    var el = $($.parseJSON(data.text()));
    var date = moment(el[0].date, "x", 'de').toDate();
    this.data = new Data(el[0].humidity, date);
    this.saveData(this.data);
  }

  refreshData() {
    let observer = this.http.get('https://testproject-91ab2.firebaseio.com/5c:cf:7f:8b:61:6f/latest.json');
    observer.subscribe(
      data => this.parse(data),
      error => console.error('Error: ' + error),
      () => console.log('Completed!')
    );
  }

  loadSavedData() {
    this.data = super.loadSavedData() as Data;
  }

  enableConditions():{}{
    return {
      onlineStatus: this.onlineStatus == "online"
    }
  }
}
