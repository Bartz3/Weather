import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { WeatherData } from 'src/models/weather.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  //0e5e26023246a3f47047360137e256e6
  apiKey='9eb20fa330msh42ae575485bf7bdp15c87ajsnd1af7c35509e';
  weatherApiBaseUrl='https://weather-api99.p.rapidapi.com/weather';
  

  XRapidAPIHostHeaderName='X-RapidAPI-Host';
  XRapidAPIHostHeaderValue='weather-api99.p.rapidapi.com';


  XRapidAPIKeyHeaderName='X-RapidAPI-Key';
  XRapidAPIKeyHeaderValue='9eb20fa330msh42ae575485bf7bdp15c87ajsnd1af7c35509e';

  constructor(private http: HttpClient) { }
     getWeatherData(cityName:string):Observable<WeatherData>{
       return this.http.get<WeatherData>(environment.weatherApiBaseUrl,{
         headers: new HttpHeaders()
         .set(environment.XRapidAPIHostHeaderName,environment.XRapidAPIHostHeaderValue)
         .set(environment.XRapidAPIKeyHeaderName,environment.XRapidAPIKeyHeaderValue),
         params: new HttpParams()
         .set('city',cityName)
        });
      }

}
