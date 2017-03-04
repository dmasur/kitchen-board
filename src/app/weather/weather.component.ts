import { Component, OnInit, Input } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';
import { Http } from '@angular/http';
import { DateFormatPipe, TimeAgoPipe } from 'angular2-moment';
import { Settings } from '../shared/settings';
import { BasePanel } from '../shared/basePanel';

class Weather {
  constructor(
    public averageTemp: number,
    public icon: string
  ) { }
}

class DailyWeatherInfo {
  public morning: Weather;
  public midday: Weather;
  public afternoon: Weather;
  public evening: Weather;
  constructor(
    public date: Date,
    public icon: string,
    public minTemp: number,
    public maxTemp: number
  ) { }
}

class WeatherForcast {
  dailyWeatherInfos: Array<DailyWeatherInfo>;
  public precipProbability: number;
  public precipAt: Date;
  public precipStopAt: Date;
  public isCurrentyRaining: boolean;
  constructor(public summary: string) {
    this.dailyWeatherInfos = [];
  }
}

@Component({
  selector: 'app-weather',
  templateUrl: 'weather.component.html',
  styleUrls: ['weather.component.css', 'kitchenboardweather.css']
})
export class WeatherComponent extends BasePanel {
  @Input() city: string;
  @Input() longitude: string;
  @Input() latitude: string;
  @Input() onlineStatus: string;
  weatherForcast: WeatherForcast;

  constructor(protected cookieService: CookieService, private http: Http, private settings: Settings) {
    super('weather', 30 * 6, cookieService);
  }

  enableConditions(): {} {
    return {
      forecastIoApiKey: this.settings.forecastIoApiKey !== undefined,
      onlineStatus: this.onlineStatus === 'online',
    }
  }

  loadSavedData() {
    this.weatherForcast = super.loadSavedData() as WeatherForcast;
  }

  getIconClass(icon: string): string {
    switch (icon) {
      case 'clear-day':
        return 'icon-sun-inv';
      case 'clear-night':
        return 'icon-moon-inv';
      case 'rain':
        return 'icon-rain-inv';
      case 'sleet':
      case 'snow':
        return 'icon-snow-heavy-inv';
      case 'wind':
        return 'icon-windy-inv';
      case 'fog':
        return 'icon-fog';
      case 'cloudy':
        return 'icon-cloud-inv';
      case 'partly-cloudy-day':
        return 'icon-cloud-sun-inv';
      case 'partly-cloudy-night':
        return 'icon-cloud-moon-inv';
    }
  }

  private darkSkyRequestString() {
    const apiKey = this.settings.forecastIoApiKey;
    const darkSkyPath = `https://api.darksky.net/forecast/${apiKey}/${this.longitude},${this.latitude}?units=ca&lang=de`;
    return `https://crossorigin.me/${darkSkyPath}`;
  }

  private createDailyWeatherInfos(dailyData: any): Array<DailyWeatherInfo> {
    const dailyWeatherInfos: Array<DailyWeatherInfo> = [];
    dailyData.slice(0, 2).forEach(dayData => {
      const maxTemp = Math.round(parseFloat(dayData.temperatureMax));
      const minTemp = Math.round(parseFloat(dayData.temperatureMin));
      const date = new Date(dayData.time * 1000);
      const dailyWeatherInfo = new DailyWeatherInfo(date, dayData.icon, maxTemp, minTemp);
      dailyWeatherInfos.push(dailyWeatherInfo);
    });
    return dailyWeatherInfos;
  }

  private enrichDailyWeatherInfos(hourlyData: any, dailyWeatherInfos: Array<DailyWeatherInfo>): Array<DailyWeatherInfo> {
    hourlyData.slice(1).forEach((entry, index) => {
      const date = new Date(entry.time * 1000);
      const dailyWeatherInfo = dailyWeatherInfos[date.getDate() - (new Date()).getDate()];
      if (dailyWeatherInfo) {
        const weather = new Weather(Math.round(entry.temperature), entry.icon);
        if (date.getHours() === 8) {
          dailyWeatherInfo.morning = weather;
        }
        if (date.getHours() === 13) {
          dailyWeatherInfo.midday = weather;
        }
        if (date.getHours() === 17) {
          dailyWeatherInfo.afternoon = weather;
        }
        if (date.getHours() === 20) {
          dailyWeatherInfo.evening = weather;
        }
      }
    });
    return dailyWeatherInfos;
  }
  refreshData() {
    this.http.get(this.darkSkyRequestString()).subscribe(data => {
      const json = data.json();
      this.weatherForcast = new WeatherForcast(json.daily.summary);
      const basicDailyWeatherInfos = this.createDailyWeatherInfos(json.daily.data);
      this.weatherForcast.isCurrentyRaining = json.hourly.data[0].icon === 'rain';
      this.weatherForcast.dailyWeatherInfos = this.enrichDailyWeatherInfos(json.hourly.data, basicDailyWeatherInfos);

      json.hourly.data.slice(1).forEach((entry, index) => {
        const date = new Date(entry.time * 1000);
        if (this.weatherForcast.precipAt == null) {
          const precipProbability = Math.round(entry.precipProbability * 100);
          if (precipProbability > 20) {
            this.weatherForcast.precipProbability = precipProbability;
            this.weatherForcast.precipAt = date;
          }
        }
        if (this.weatherForcast.precipStopAt == null) {
          const precipProbability = Math.round(entry.precipProbability * 100);
          if (precipProbability < 20) {
            this.weatherForcast.precipStopAt = date;
          }
        }
      });
      super.saveData(this.weatherForcast);
    });
  }
}
// 7-10 11-14 15-18