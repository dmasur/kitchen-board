import { Component } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';
import { Http } from '@angular/http';
import { DateFormatPipe } from 'angular2-moment';
import { BasePanel } from '../shared/basePanel';
declare var $: any;

class News {
  constructor(public title: string, public image: string, public summary: string, public date: Date) { }
}

@Component({
  moduleId: module.id,
  selector: 'app-news',
  templateUrl: 'news.component.html',
  styleUrls: ['news.component.css'],
  inputs: ['onlineStatus']
})
export class NewsComponent extends BasePanel {
  newsItems: Array<News> = [];
  onlineStatus: string;

  constructor(protected cookieService: CookieService, private http: Http) {
    super("news", 15 * 60, cookieService);
  }

  loadSavedData() {
    this.newsItems = super.loadSavedData() as Array<News>;
  }

  enableConditions():{}{
    return {
      onlineStatus: this.onlineStatus == "online"
    }
  }

  parse(data) {
    var newsItems = [];
    var items = $(data.text()).find("item").slice(0, 6);
    for (var i = 0, l = items.length; i < l; i++) {
      var el = $(items[i]);
      var image = el.find("enclosure").attr("url");
      if(image){
        image = image.replace("http:", "https:");
      }
      newsItems.push(new News(
        el.find("title").text(),
        image,
        el.find("description").text(),
        new Date(el.find("pubDate").text())
      ));
    }
    this.newsItems = newsItems;
    this.saveData(newsItems);
  }

  refreshData() {
    let observer = this.http.get('https://cors-anywhere.herokuapp.com/http://www.spiegel.de/schlagzeilen/tops/index.rss');
    observer.subscribe(
      data => this.parse(data),
      error => console.error('Error: ' + error),
      () => console.log('Completed!')
    );
  }
}
