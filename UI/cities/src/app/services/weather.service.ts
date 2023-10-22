import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { WeatherData } from 'src/models/weather.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  apiKey='0e5e26023246a3f47047360137e256e6';
  weatherApiBaseUrl='https://weather-api99.p.rapidapi.com/weather';

  XRapidAPIHostHeaderName='X-RapidAPI-Host';
  XRapidAPIHostHeaderValue='weather-api99.p.rapidapi.com';


  XRapidAPIKeyHeaderName='X-RapidAPI-Key';
  XRapidAPIKeyHeaderValue='1ea3d85e54msh518772aaf03d0a9p1be360jsn9260cb5e1a13';

  //https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
  constructor(private http: HttpClient) { }

  //  getWeatherData(cityName:string):Observable<WeatherData>{
  //   return this.http.get<WeatherData>(environment.weatherApiBaseUrl+'/city/'+cityName,{
  //     headers: new HttpHeaders()
  //     .set(environment.XRapidAPIHostHeaderName,environment.XRapidAPIHostHeaderValue)
  //     .set(environment.XRapidAPIKeyHeaderName,environment.XRapidAPIKeyHeaderValue)
  //   });
     getWeatherData(cityName:string):Observable<WeatherData>{
       return this.http.get<WeatherData>(this.weatherApiBaseUrl,{
         headers: new HttpHeaders()
         .set(this.XRapidAPIHostHeaderName,this.XRapidAPIHostHeaderValue)
         .set(this.XRapidAPIKeyHeaderName,this.XRapidAPIKeyHeaderValue),
         params: new HttpParams()
         .set('city',cityName)
        });
      }
      // getWeatherData1(cityName:string):Observable<WeatherData>{
      //   var headers={
      //     'X-RapidAPI-Host':'weather-api99.p.rapidapi.com',
      //     'X-RapidAPI-Key':'1ea3d85e54msh518772aaf03d0a9p1be360jsn9260cb5e1a13'
      //   }
      //   var appid=['da0f9c8d90bde7e619c3ec47766a42f4'];
      //   var q=cityName;

      //   var units = 'standard';
      //   return this.http.get<WeatherData>(this.weatherApiBaseUrl,{params:{q,appid,units},headers:headers})
      //  }
        
      // getWeatherData(cityName:string):Observable<WeatherData>{
      //   return this.http.get<WeatherData>(this.weatherApiBaseUrl,{
      //     headers: new HttpHeaders()
      //     .set(this.XRapidAPIHostHeaderName,this.XRapidAPIHostHeaderValue)
      //     .set(this.XRapidAPIKeyHeaderName,this.XRapidAPIKeyHeaderValue),
      //     params: new HttpParams()
      //     .set('q',cityName)
      //     .set('units','metric')
      //     .set('mode','json')
      //   });
      // getWeatherData(cityName: string):Observable<WeatherData> {
      //   const url = 'https://weather-api99.p.rapidapi.com/weather';
    
      //   const headers = new HttpHeaders()
      //     .set('X-RapidAPI-Host', 'weather-api99.p.rapidapi.com')
      //     .set('X-RapidAPI-Key', this.XRapidAPIKeyHeaderValue);
    
      //   const params = new HttpParams().set('q', cityName);
    
      //   return this.http.get<WeatherData>(url, { headers, params });
      // }

}
