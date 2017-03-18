import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { DateFormatPipe } from 'angular2-moment';
import { BasePanel } from '../shared/basePanel';
import { CookieService } from 'angular2-cookie/core';
import { Settings } from '../shared/settings';

@Component({
  moduleId: module.id,
  selector: 'app-camera',
  templateUrl: 'camera.component.html',
  styleUrls: ['camera.component.css']
})
export class CameraComponent extends BasePanel implements OnInit {
  dateTime: Date;
  @Input() private onlineStatus: string;
  public baseUrl = 'https://77.182.189.53:38732/cgi-bin/CGIProxy.fcgi';

  constructor(protected cookieService: CookieService, private settings: Settings) {
    super('camera', 5, cookieService);
  }

  enableConditions(): {} {
    return {
      foscamUser: this.settings.cameraUsername != null,
      foscamPassword: this.settings.cameraPassword != null
    };
  }

  createUrl(): string {
    return this.baseUrl +
      '?cmd=snapPicture2&usr=' + this.settings.cameraUsername +
      '&pwd=' + this.settings.cameraPassword +
      '&date=' + new Date().getTime();
  }

  refreshData() {
    this.refreshImage();
  }

  refreshImage() {
    (<HTMLImageElement>document.getElementById('cameraImage')).src = this.createUrl();
  }
}
