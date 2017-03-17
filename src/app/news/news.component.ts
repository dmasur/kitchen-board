import { Component, Input } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';
import { Http } from '@angular/http';
import { DateFormatPipe } from 'angular2-moment';
import { BasePanel } from '../shared/basePanel';
declare var $: any;

class News {
  constructor(public title: string, public image: string, public summary: string, public date: Date) { }
}

@Component({
  selector: 'app-news',
  templateUrl: 'news.component.html',
  styleUrls: ['news.component.css']
})
export class NewsComponent extends BasePanel {
  newsItems: Array<News> = [];
  @Input() private onlineStatus: string;

  constructor(protected cookieService: CookieService, private http: Http) {
    super('news', 15 * 60, cookieService);
  }

  loadSavedData() {
    this.newsItems = super.loadSavedData() as Array<News>;
  }

  enableConditions(): {} {
    return {
      onlineStatus: this.onlineStatus === 'online'
    };
  }

  parse(data) {
    const newsItems = [];
    const items = $(data.text()).find('item').slice(0, 6);
    for (let i = 0; i < items.length; i++) {
      const el = $(items[i]);
      let image = el.find('enclosure').attr('url');
      if (image) {
        image = image.replace('http:', 'https:');
      }
      newsItems.push(new News(
        el.find('title').text(),
        image,
        el.find('description').text(),
        new Date(el.find('pubDate').text())
      ));
    }
    this.newsItems = newsItems;
    this.saveData(newsItems);
  }

  refreshData() {
    const observer = this.http.get('https://crossorigin.me/http://www.spiegel.de/schlagzeilen/tops/index.rss');
    observer.subscribe(
      data => this.parse(data),
      error => console.error('Error: ' + error),
      () => console.log('Received News Headlines!')
    );
  }
}
