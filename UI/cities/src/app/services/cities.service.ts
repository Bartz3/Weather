import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { City } from 'src/models/city.model';

@Injectable({
  providedIn: 'root'
})

export class CitiesService {

  baseUrl = 'https://localhost:7029/api/CitiesConttroler';

  constructor(private http: HttpClient) { }

  // Get all cities ,private cityService:CitiesService
  getAllCities(): Observable<City[]> {
    return this.http.get<City[]>(this.baseUrl);
  }

  addCity(city: City): Observable<City> {
    city.id = '00000000-0000-0000-0000-000000000000';
    return this.http.post<City>(this.baseUrl, city);
  }

  deleteCity(id: string): Observable<City> {
    return this.http.delete<City>(this.baseUrl + '/' + id);
  }
  test = 'https://localhost:7029/api/Cities';

  updateCity(city: City): Observable<City> {
    console.log('haki' + city.id);
    return this.http.put<City>(this.baseUrl + '/' + city.id, city);
  }
  //UpdateCity/

}
