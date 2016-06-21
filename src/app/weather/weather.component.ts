import { Component, OnInit } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';
import { Http, Response, HTTP_BINDINGS } from '@angular/http';

class WeatherInfo{
  cityName: string;
  temp: string;
  icon: string;
}

@Component({
  moduleId: module.id,
  selector: 'app-weather',
  templateUrl: 'weather.component.html',
  styleUrls: ['weather.component.css']
})
export class WeatherComponent implements OnInit {
  weatherInfos: Array<WeatherInfo>;

  constructor(private cookieService: CookieService, private http: Http) {}

  ngOnInit() {
    this.loadWeather();
  }

  loadWeather(){
      var lastSave = this.cookieService.getObject('weather.savedAt');
      if(true && lastSave < Date.now() + 10 * 60000) { // 10 Minuten
        this.weatherInfos = JSON.parse(this.cookieService.get('weather.weatherInfos'));
      } else {
        this.refreshEvents()
      }
  }

  refreshEvents(){
    this.weatherInfos = [];
    var cities = ['Bottrop', 'Düsseldorf'];
    cities.forEach(city => {
      var weatherInfo = new WeatherInfo();
      weatherInfo.cityName = city;
      var requestString = "http://api.openweathermap.org/data/2.5/weather?q=" + city
                          + "&format=json&units=metric"
                          + "&APPID=f316649a0a3ade226bfdfcc8c3b57fd3" ;
      this.http.get(requestString).subscribe(data => {
        var json = data.json()
        weatherInfo.icon = json.weather[0].icon;
        weatherInfo.temp = json.main.temp;
        this.weatherInfos.push(weatherInfo);
        this.cookieService.put('weather.savedAt', JSON.stringify(Date.now()));
        this.cookieService.put('weather.weatherInfos', JSON.stringify(this.weatherInfos));
        debugger
      })
    });
  }

}
