import { Component, OnInit } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';
import { Http } from '@angular/http';
import {DateFormatPipe, TimeAgoPipe} from 'angular2-moment';
import {Settings} from '../shared/settings';

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
export class WeatherComponent implements OnInit {
  weatherInfos: Array<WeatherInfo>;
  city: string;
  longitude: string;
  latitude: string;
  onlineStatus: string;
  lastUpdate:Date;
  enabled: boolean;
  dailyWeatherInfo: DailyWeatherInfo;

  constructor(private cookieService: CookieService, private http: Http, private settings: Settings) {
    this.enabled = settings.forecastIoApiKey !== undefined;
  }

  ngOnInit() {
    this.loadWeather();
  }

  loadWeather(){
    if(true || this.enabled && this.onlineStatus == "online"){
      this.refreshEvents();
      setInterval(() => this.refreshEvents(), 10 * 60 * 1000)
    }else {
      if(this.cookieService.get('weather.savedAt') != undefined){
        this.weatherInfos = JSON.parse(this.cookieService.get('weather.weatherInfos'));
        this.dailyWeatherInfo = JSON.parse(this.cookieService.get('weather.dailyWeatherInfo'));
        this.lastUpdate = JSON.parse(this.cookieService.get('weather.savedAt'));
      }
    }
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

  refreshEvents(){
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
      this.lastUpdate = new Date();
      this.cookieService.put('weather.savedAt', JSON.stringify(this.lastUpdate));
      this.cookieService.put('weather.dailyWeatherInfo', JSON.stringify(this.dailyWeatherInfo));
      this.cookieService.put('weather.weatherInfos', JSON.stringify(this.weatherInfos));
    })
  }
}
