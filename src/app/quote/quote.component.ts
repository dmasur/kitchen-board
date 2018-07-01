import { Component, Input } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';
import { Http } from '@angular/http';
import { DateFormatPipe } from 'angular2-moment';
import { BasePanel } from '../shared/basePanel';
import { CorsService } from 'app/services/corsService';

declare var $: any;

class Quote {
  constructor(public text: string, public author: string) { }
}

@Component({
  selector: 'app-quote',
  templateUrl: 'quote.component.html',
  styleUrls: ['quote.component.css']
})

export class QuoteComponent extends BasePanel {
  public quote: Quote = new Quote('', '');
  @Input() private onlineStatus: string;

  constructor(protected cookieService: CookieService, private http: Http, private corsService: CorsService) {
    super('quote', 60 * 60, cookieService); // every Hour
  }

  parse(data) {
    const el = $($.parseXML(data.text()));
    this.quote = new Quote(
      el.find('item description').text(),
      el.find('author').text()
    );
    this.saveData(this.quote);
  }

  refreshData() {
    this.corsService.getResponse('http://spruchsammlung.com/content/rssquotes', (data) => {this.parse(data); });
  }

  loadSavedData() {
    this.quote = super.loadSavedData() as Quote;
  }

  enableConditions(): {} {
    return {
      onlineStatus: this.onlineStatus === 'online'
    };
  }
}
