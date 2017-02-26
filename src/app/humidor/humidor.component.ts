import { Component } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';
import { Http } from '@angular/http';
import { DateFormatPipe } from 'angular2-moment';
import { BasePanel } from '../shared/basePanel';

declare var $: any;

class Data {
  constructor(public humidity: string, public time: string) { }
}

@Component({
  selector: 'app-humidor',
  templateUrl: 'humidor.component.html',
  styleUrls: ['humidor.component.css'],
  inputs: ['onlineStatus']
})

export class HumidorComponent extends BasePanel {
  public data: Data = new Data("N/A", "N/A");
  private onlineStatus: string;

  constructor(protected cookieService: CookieService, private http: Http) {
    super('humidor', 60, cookieService); // every Hour
  }

  parse(data) {
    var el = $($.parseJSON(data.text()));

    this.data = new Data(el[0].humidity,""
    );
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
