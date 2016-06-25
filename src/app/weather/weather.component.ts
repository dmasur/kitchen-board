import { Component, OnInit } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';
import { Http } from '@angular/http';
import { DateFormatPipe, TimeAgoPipe } from 'angular2-moment';
import { Settings } from '../shared/settings';
import { BasePanel } from '../shared/basePanel';

class DailyWeatherInfo{
  public precipProbability: number;
  public precipAt:Date;
  constructor(
    public icon: string,
    public summary: string,
    public minTemp: number,
    public maxTemp: number
  ) {}
}
class WeatherInfo{
  constructor(
    public date: Date,
    public icon: string,
    public temp: number,
    public summary: string,
    public precipProbability: number
  ) {}
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
  weatherInfos: Array<WeatherInfo>;
  city: string;
  longitude: string;
  latitude: string;
  onlineStatus: string;
  dailyWeatherInfo: DailyWeatherInfo;

  constructor(protected cookieService: CookieService, private http: Http, private settings: Settings) {
    super("weather", 30 * 6, cookieService);
  }

  enabled(){
    return this.onlineStatus == "online" && this.settings.forecastIoApiKey !== undefined;
  }

  loadSavedData(){
    this.dailyWeatherInfo = super.loadSavedData() as DailyWeatherInfo;
  }

  getIconClass(icon: string):string{
    switch(icon){
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

  refreshData(){
    var requestString = "https://crossorigin.me/https://api.forecast.io/forecast/"+this.settings.forecastIoApiKey+"/"+this.longitude+","+this.latitude+"?units=si&lang=de";
    this.http.get(requestString).subscribe(data => {
      this.weatherInfos = [];
      var json = data.json()
      var daily = json.daily;
      var maxTemp = Math.round(parseFloat(daily.data[0].temperatureMax));
      var minTemp = Math.round(parseFloat(daily.data[0].temperatureMin));
      this.dailyWeatherInfo = new DailyWeatherInfo(daily.icon, daily.summary, maxTemp, minTemp);
      json.hourly.data.forEach((entry, index) => {
        if(this.dailyWeatherInfo.precipAt == null){
          var precipProbability = Math.round(entry.precipProbability * 100);
          if(precipProbability > 10){
            this.dailyWeatherInfo.precipProbability = precipProbability;
            this.dailyWeatherInfo.precipAt = new Date(entry.time*1000);
          }
        }
      })
      super.saveData(this.dailyWeatherInfo);
    })
  }
}
