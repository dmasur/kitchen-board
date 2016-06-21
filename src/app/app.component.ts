import { Component, OnInit } from '@angular/core';
import { GoogleCalendarComponent } from './google-calendar/google-calendar.component';
import {AuthenticationService} from './authentication.service'
import {CookieService} from 'angular2-cookie/core';
import { Http, Response, HTTP_BINDINGS } from '@angular/http';

class WeatherInfo{
  cityName: string;
  temp: string;
  icon: string;
}

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [GoogleCalendarComponent],
  providers: [Http, HTTP_BINDINGS, AuthenticationService, CookieService]
})

export class AppComponent implements OnInit {
  weatherInfos: Array<WeatherInfo>;

  constructor(private authenticationService: AuthenticationService, private cookieService: CookieService, private http: Http){
  }

  ngOnInit() {
    this.updateWeather();
  }

  updateWeather(){
    this.weatherInfos = [];
    // var cities = ['Bottrop', 'Düsseldorf'];
    // cities.forEach(city => {
    //   var weatherInfo = new WeatherInfo();
    //   weatherInfo.cityName = city;
    //   var requestString = "http://api.openweathermap.org/data/2.5/weather?q=" + city
    //                       + "&format=json&units=metric"
    //                       + "&APPID=f316649a0a3ade226bfdfcc8c3b57fd3" ;
    //   this.http.get(requestString).subscribe(data => {
    //     var json = data.json()
    //   weatherInfo.icon = json.weather[0].icon;
    //   weatherInfo.temp = json.main.temp;
    //   //http://openweathermap.org/img/w/
    //   //var json = JSON.parse(data._body);
    //   this.weatherInfos.push(weatherInfo);
    // })
    //   this.cookieService.put('weather.savedAt', JSON.stringify(Date.now()));
    //   this.cookieService.put('weather.weatherInfos', JSON.stringify(this.weatherInfos));
    // });
  }

  updateRss(){
    //this.http.get("http://www.spiegel.de/schlagzeilen/tops/index.rss").subscribe(data => {

    //});
  }

}
