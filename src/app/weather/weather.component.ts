import { Component, OnInit } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';
import { Http, Response, HTTP_BINDINGS } from '@angular/http';
import {DateFormatPipe} from 'angular2-moment';

class WeatherInfo{
  constructor(public date: Date, public icon: string, public temp: number, public summary: string) {}
}

@Component({
  moduleId: module.id,
  inputs: ['city', 'longitude', 'latitude'],
  selector: 'app-weather',
  templateUrl: 'weather.component.html',
  styleUrls: ['weather.component.css'],
  pipes: [DateFormatPipe]
})
export class WeatherComponent implements OnInit {
  weatherInfos: Array<WeatherInfo>;
  city: string;
  longitude: string;
  latitude: string

  constructor(private cookieService: CookieService, private http: Http) {}

  ngOnInit() {
    this.loadWeather();
  }

  loadWeather(){
      var lastSave = this.cookieService.getObject('weather.savedAt');
      if(lastSave < Date.now() + 10 * 60000) { // 10 Minuten
        this.weatherInfos = JSON.parse(this.cookieService.get('weather.weatherInfos'));
      } else {
        this.refreshEvents();
      }
  }

  refreshEvents(){
    this.weatherInfos = [];
    var requestString = "https://crossorigin.me/https://api.forecast.io/forecast/b7b2a91c78b9c2045bd83550affe1daa/"+this.longitude+","+this.latitude;
    this.http.get(requestString).subscribe(data => {
      var json = data.json()
      json.hourly.data.slice(0,3).forEach(entry => {
        var temp = Math.round((parseFloat(entry.temperature) -32) * 5 / 9);
        var date = new Date(entry.time*1000);
        var weatherInfo= new WeatherInfo(date, entry.icon, temp, entry.summary);
        this.weatherInfos.push(weatherInfo);
      })
      this.cookieService.put('weather.savedAt', JSON.stringify(Date.now()));
      this.cookieService.put('weather.weatherInfos', JSON.stringify(this.weatherInfos));
    })
  }
}
