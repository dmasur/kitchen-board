import { Component, OnInit } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';
import { Http } from '@angular/http';
import { DateFormatPipe, TimeAgoPipe } from 'angular2-moment';
import { Settings } from '../shared/settings';
import { BasePanel } from '../shared/basePanel';

class DailyWeatherInfo {
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
  constructor(public summary: string) {
    this.dailyWeatherInfos = [];
  }
}

@Component({
  moduleId: module.id,
  inputs: ['city', 'longitude', 'latitude', 'onlineStatus'],
  selector: 'app-weather',
  templateUrl: 'weather.component.html',
  styleUrls: ['weather.component.css', 'kitchenboardweather.css'],
  pipes: [DateFormatPipe, TimeAgoPipe]
})
export class WeatherComponent extends BasePanel {
  city: string;
  longitude: string;
  latitude: string;
  onlineStatus: string;
  weatherForcast: WeatherForcast;

  constructor(protected cookieService: CookieService, private http: Http, private settings: Settings) {
    super("weather", 30 * 6, cookieService);
  }

  enabled() {
    return this.onlineStatus == "online" && this.settings.forecastIoApiKey !== undefined;
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

  refreshData() {
    var requestString = "https://crossorigin.me/https://api.forecast.io/forecast/" + this.settings.forecastIoApiKey + "/" + this.longitude + "," + this.latitude + "?units=si&lang=de";
    this.http.get(requestString).subscribe(data => {
      var dailyWeatherInfos = [];
      var json = data.json()
      var daily = json.daily;
      this.weatherForcast = new WeatherForcast(daily.summary);
      daily.data.slice(0, 2).forEach(data => {
        var maxTemp = Math.round(parseFloat(data.temperatureMax));
        var minTemp = Math.round(parseFloat(data.temperatureMin));
        var date = new Date(data.time * 1000);
        var dailyWeatherInfo = new DailyWeatherInfo(date, daily.icon, maxTemp, minTemp);
        this.weatherForcast.dailyWeatherInfos.push(dailyWeatherInfo);
      })
      json.hourly.data.slice(1).forEach((entry, index) => {
        if (this.weatherForcast.precipAt == null) {
          var precipProbability = Math.round(entry.precipProbability * 100);
          if (precipProbability > 20) {
            this.weatherForcast.precipProbability = precipProbability;
            this.weatherForcast.precipAt = new Date(entry.time * 1000);
          }
        }
      })
      super.saveData(this.weatherForcast);
    })
  }
}
