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
  public baseUrl = 'https://192.168.178.21:443/cgi-bin/CGIProxy.fcgi';

  constructor(protected cookieService: CookieService, private settings: Settings) {
    super('camera', 20, cookieService);
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
    console.log('Camera image updated');
    this.lastUpdate = new Date();
    (<HTMLImageElement>document.getElementById('cameraImage')).src = this.createUrl();
  }
}
