import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  apiKey='0e5e26023246a3f47047360137e256e6';
  //https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
  constructor(private http: HttpClient) { }

  getWeatherData(cityName:string){
    this.http.get(environment.weatherApiBaseUrl);

  }
}
