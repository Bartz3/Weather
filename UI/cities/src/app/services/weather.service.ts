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
  apiKey='bf165ce1a5mshb26a5b2facf5961p1e232ejsn1f6d5fd89027';
  weatherApiBaseUrl='https://weather-api99.p.rapidapi.com/weather';

  XRapidAPIHostHeaderName='X-RapidAPI-Host';
  XRapidAPIHostHeaderValue='weather-api99.p.rapidapi.com';


  XRapidAPIKeyHeaderName='X-RapidAPI-Key';
  XRapidAPIKeyHeaderValue='1ea3d85e54msh518772aaf03d0a9p1be360jsn9260cb5e1a13';

  constructor(private http: HttpClient) { }
     getWeatherData(cityName:string):Observable<WeatherData>{
       return this.http.get<WeatherData>(this.weatherApiBaseUrl,{
         headers: new HttpHeaders()
         .set(this.XRapidAPIHostHeaderName,this.XRapidAPIHostHeaderValue)
         .set(this.XRapidAPIKeyHeaderName,this.XRapidAPIKeyHeaderValue),
         params: new HttpParams()
         .set('city',cityName)
        });
      }

}
