import { Component, OnInit } from '@angular/core';
import { CitiesService } from './services/cities.service';
import { City } from 'src/models/city.model';
import { WeatherService } from './services/weather.service';
import { WeatherData } from 'src/models/weather.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'cities';
  cities: City[] = [];

  city: City = {
    id: '',
    name: '',
    country: '',
    population: 0
  }

  weatherData?: WeatherData;
  kelvinConst: number;
  cancelClicked: boolean = false;

  constructor(private cityService: CitiesService,
    private weatherService: WeatherService) {
    this.kelvinConst = 273.15;

  }

  // Init method, receving cities from DB
  ngOnInit(): void {
    this.getAllCities();
  }

  // Cancel button, removing city from input
  cancelMethod(city: City) {
    city = {
      id: '',
      name: '',
      country: '',
      population: 0
    }
    this.weatherData?.name==='';
    // this.getWeather(city.name);
    
    
  }

  // Showing weather information of selected city
  onSubmitWeather() {
    this.getWeather(this.city.name);
  }

 // Assigning API values to a weatherData
  getWeather(cityName: string) {
    this.weatherService.getWeatherData(cityName)
      .subscribe({
        next: (response) => {
          this.weatherData = response;
          console.log(response);
        }
      })
  }

  // Receving all cities from DB
  getAllCities() {
    this.cityService.getAllCities()
      .subscribe(
        response => {
          console.log(response);
          this.cities = response;
        }
      );
  }

  // Action for adding(if id='')/updating city
  onSubmit() {
    if (this.city.id === '') {
      this.addCity(this.city);
    } else {
      this.updateCity(this.city);
    }
  }

  // Adding city to DB
  addCity(city: City) {
    this.cityService.addCity(this.city)
      .subscribe(
        response => {
          console.log(this.city);
          this.getAllCities();
          this.city = {
            id: '',
            name: '',
            country: '',
            population: 0
          }
        }
      );
  }

  // Updating seleccted city, after setting deafult values
  updateCity(city: City) {
    this.cityService.updateCity(city)
      .subscribe(
        response => {
          this.getAllCities();
          this.city = {
            id: '',
            name: '',
            country: '',
            population: 0
          }
        }
      )
  }

  // Delete city from DB
  deleteCity(id: string) {
    this.cityService.deleteCity(id)
      .subscribe(
        response => {
          this.getAllCities();
        }
      )
  }

  // Setting selected city to edit/getWeather
  populate(city: City) {
    this.city = city;
  }
}
