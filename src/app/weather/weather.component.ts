import { Component, OnInit } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';
import { Http } from '@angular/http';
import { DateFormatPipe, TimeAgoPipe } from 'angular2-moment';
import { Settings } from '../shared/settings';
import { BasePanel } from '../shared/basePanel';

class Weather {
  constructor(
    public averageTemp: number,
    public icon: string
  ) {}
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

  enableConditions():{}{
    return {
      forecastIoApiKey: this.settings.forecastIoApiKey !== undefined,
      onlineStatus: this.onlineStatus == "online",
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
      this.weatherForcast.isCurrentyRaining = json.hourly.data[0].icon == "rain";
      var today = new Date();
      json.hourly.data.slice(1).forEach((entry, index) => {
        var date = new Date(entry.time * 1000);
        var dailyWeatherInfo = this.weatherForcast.dailyWeatherInfos[date.getDate() - today.getDate()];
        if(dailyWeatherInfo){
          var weather = new Weather(Math.round(entry.temperature), entry.icon);
          if(date.getHours() == 8){
            dailyWeatherInfo.morning = weather;
          }
          if(date.getHours() == 13){
            dailyWeatherInfo.midday = weather;
          }
          if(date.getHours() == 17){
            dailyWeatherInfo.afternoon = weather;
          }
          if(date.getHours() == 20){
            dailyWeatherInfo.evening = weather;
          }
        }
        if (this.weatherForcast.precipAt == null) {
          var precipProbability = Math.round(entry.precipProbability * 100);
          if (precipProbability > 20) {
            this.weatherForcast.precipProbability = precipProbability;
            this.weatherForcast.precipAt = date;
          }
        }
        if (this.weatherForcast.precipStopAt == null) {
          var precipProbability = Math.round(entry.precipProbability * 100);
          if (precipProbability < 20) {
            this.weatherForcast.precipStopAt = date;
          }
        }
      })
      super.saveData(this.weatherForcast);
    })
  }
}
// 7-10 11-14 15-18