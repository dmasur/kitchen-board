import { Component, OnInit } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';
import { Http, Response, HTTP_BINDINGS } from '@angular/http';
import {DateFormatPipe} from 'angular2-moment';

class WeatherInfo{
  constructor(public date: Date, public icon: string, public temp: number, public iconText: string) {}
}

@Component({
  moduleId: module.id,
  inputs: ['city'],
  selector: 'app-weather',
  templateUrl: 'weather.component.html',
  styleUrls: ['weather.component.css'],
  pipes: [DateFormatPipe]
})
export class WeatherComponent implements OnInit {
  weatherInfos: Array<WeatherInfo>;
  city: string;

  constructor(private cookieService: CookieService, private http: Http) {}

  ngOnInit() {
    this.loadWeather();
  }

  loadWeather(){
      var lastSave = this.cookieService.getObject('weather.savedAt');
      if(false && lastSave < Date.now() + 10 * 60000) { // 10 Minuten
        this.weatherInfos = JSON.parse(this.cookieService.get('weather.weatherInfos'));
      } else {
        this.refreshEvents();
      }
  }

  refreshEvents(){
    this.weatherInfos = [];
    var requestString = "http://api.openweathermap.org/data/2.5/forecast?q=" + this.city
                        + "&format=json&units=metric&cnt=4"
                        + "&APPID=f316649a0a3ade226bfdfcc8c3b57fd3" ;
    this.http.get(requestString).subscribe(data => {
      var json = data.json()
      json.list.forEach(entry => {
        var temp = Math.round(parseFloat(entry.main.temp));
        var date = new Date(entry.dt_txt);
        var weatherInfo= new WeatherInfo(date, entry.weather[0].icon, temp, entry.weather[0].description);
        this.weatherInfos.push(weatherInfo);
      })
      this.cookieService.put('weather.savedAt', JSON.stringify(Date.now()));
      this.cookieService.put('weather.weatherInfos', JSON.stringify(this.weatherInfos));
    })
  }
}
