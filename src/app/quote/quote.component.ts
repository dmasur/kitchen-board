import { Component } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';
import { Http } from '@angular/http';
import { DateFormatPipe } from 'angular2-moment';
import { BasePanel } from '../shared/basePanel';

declare var $: any;

class Quote {
  constructor(public text: string, public author: string) { }
}

@Component({
  moduleId: module.id,
  selector: 'app-quote',
  templateUrl: 'quote.component.html',
  styleUrls: ['quote.component.css'],
  inputs: ['onlineStatus']
})

export class QuoteComponent extends BasePanel {
  public quote: Quote = new Quote("", "");
  private onlineStatus: string;

  constructor(protected cookieService: CookieService, private http: Http) {
    super('quote', 60 * 60, cookieService); // every Hour
  }

  parse(data) {
    var el = $($.parseXML(data.text()));
    this.quote = new Quote(
      el.find("item description").text(),
      el.find("author").text()
    );
    this.saveData(this.quote);
  }

  refreshData() {
    let observer = this.http.get('https://crossorigin.me/http://spruchsammlung.com/content/rssquotes');
    observer.subscribe(
      data => this.parse(data),
      error => console.error('Error: ' + error),
      () => console.log('Completed!')
    );
  }

  loadSavedData() {
    this.quote = super.loadSavedData() as Quote;
  }

  enableConditions():{}{
    return {
      onlineStatus: this.onlineStatus == "online"
    }
  }
}
