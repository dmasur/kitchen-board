import { NewsFormModalComponent } from './../news-form-modal/news-form-modal.component';
import { Component, Input } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';
import { Http } from '@angular/http';
import { DateFormatPipe } from 'angular2-moment';
import { BasePanel } from '../shared/basePanel';
import { CorsService } from '../services';
import { News } from './shared/news';
declare var $: any;
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-news',
  templateUrl: 'news.component.html',
  styleUrls: ['news.component.css']
})
export class NewsComponent extends BasePanel {
  newsItems: Array<News> = [];
  @Input() private onlineStatus: string;

  constructor(protected cookieService: CookieService,
    private http: Http,
    private corsService: CorsService,
    private newsFormModalComponent: NewsFormModalComponent,
    private modalService: NgbModal) {
      super('news', 15 * 60, cookieService);
  }

  openNews(index: number) {
    const modal = this.modalService.open(NewsFormModalComponent);
    modal.componentInstance.news = this.newsItems[index];
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
    this.corsService.getResponse('http://www.spiegel.de/schlagzeilen/tops/index.rss', (data) => {this.parse(data); });
  }
}
