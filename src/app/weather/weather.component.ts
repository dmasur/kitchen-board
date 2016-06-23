import { Component, OnInit } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';
import { Http } from '@angular/http';
import {DateFormatPipe, TimeAgoPipe} from 'angular2-moment';
import {Settings} from '../shared/settings';

class WeatherInfo{
  constructor(public date: Date, public icon: string, public temp: number, public summary: string) {}
  //  fog, cloudy, partly-cloudy-day, or partly-cloudy-night
  getIconClass():string{
    switch(this.icon){
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

  constructor(private cookieService: CookieService, private http: Http, private settings: Settings) {}

  ngOnInit() {
    this.loadWeather();
  }

  loadWeather(){
    if(this.onlineStatus == "online"){
      this.refreshEvents();
      setInterval(() => this.refreshEvents(), 10 * 60 * 1000)
    }else {
      this.weatherInfos = JSON.parse(this.cookieService.get('weather.weatherInfos'));
      this.lastUpdate = JSON.parse(this.cookieService.get('weather.savedAt'));
    }
  }

  refreshEvents(){
    var requestString = "https://crossorigin.me/https://api.forecast.io/forecast/"+this.settings.forecastIoApiKey+"/"+this.longitude+","+this.latitude;
    this.http.get(requestString).subscribe(data => {
      this.weatherInfos = [];
      var json = data.json()
      json.hourly.data.slice(0,12).forEach((entry, index) => {
        if((index % 3) != 1) return;
        var temp = Math.round((parseFloat(entry.temperature) -32) * 5 / 9);
        var date = new Date(entry.time*1000);
        var weatherInfo= new WeatherInfo(date, entry.icon, temp, entry.summary);
        this.weatherInfos.push(weatherInfo);
      })
      this.lastUpdate = new Date();
      this.cookieService.put('weather.savedAt', JSON.stringify(this.lastUpdate));
      this.cookieService.put('weather.weatherInfos', JSON.stringify(this.weatherInfos));
    })
  }
}
