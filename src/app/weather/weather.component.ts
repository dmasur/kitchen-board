import { Component, OnInit } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';
import { Http, Response, HTTP_BINDINGS } from '@angular/http';
import {DateFormatPipe, TimeAgoPipe} from 'angular2-moment';

class WeatherInfo{
  constructor(public date: Date, public icon: string, public temp: number, public summary: string) {}
}

@Component({
  moduleId: module.id,
  inputs: ['city', 'longitude', 'latitude', 'onlineStatus'],
  selector: 'app-weather',
  templateUrl: 'weather.component.html',
  styleUrls: ['weather.component.css'],
  pipes: [DateFormatPipe, TimeAgoPipe]
})
export class WeatherComponent implements OnInit {
  weatherInfos: Array<WeatherInfo>;
  city: string;
  longitude: string;
  latitude: string;
  onlineStatus: string;
  lastUpdate:Date;

  constructor(private cookieService: CookieService, private http: Http) {}

  ngOnInit() {
    this.loadWeather();
  }

  loadWeather(){
    if(this.onlineStatus == "online"){
      this.refreshEvents();
      setInterval(this.refreshEvents, 10 * 60)
    }else {
      this.weatherInfos = JSON.parse(this.cookieService.get('weather.weatherInfos'));
      this.lastUpdate = JSON.parse(this.cookieService.get('weather.savedAt'));
    }
  }

  refreshEvents(){
    var requestString = "https://crossorigin.me/https://api.forecast.io/forecast/b7b2a91c78b9c2045bd83550affe1daa/"+this.longitude+","+this.latitude;
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
