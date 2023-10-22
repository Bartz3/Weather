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
  cities: City[]=[];

  city:City={
    id:'',
    name:'',
    country:'',
    population: 0
  }

  weatherData?:WeatherData;

  constructor(private cityService: CitiesService,
    private weatherService:WeatherService){

  }

  cancelMethod(city:City){
    city={
      id:'',
      name:'',
      country:'',
      population: 0
    }
  }
  onSubmitWeather(){
    this.getWeather(this.city.name);
  }
  
  getWeather(cityName:string){
    this.weatherService.getWeatherData(cityName)
    .subscribe({
      next:(response)=>{
        this.weatherData=response;
        console.log(response);
      }
    })
  }

  ngOnInit(): void {
    this.getAllCities();  
    // this.getWeather('Bialystok');
  }

getAllCities() {
  this.cityService.getAllCities()
    .subscribe(
      response => {
        console.log(response);
        this.cities = response; 
      }
    );
}

onSubmit(){
  if(this.city.id===''){
    this.addCity(this.city);
  }else{
    this.updateCity(this.city);
  }
}

addCity(city:City){
  this.cityService.addCity(this.city)
  .subscribe(
    response=>{
      console.log(this.city);
      this.getAllCities();
      this.city={
        id:'',
        name:'',
        country:'',
        population: 0
      }
    }
  );
}

updateCity(city:City){
  this.cityService.updateCity(city)
  .subscribe(
    response=>{
      this.getAllCities();
      this.city={
        id:'',
        name:'',
        country:'',
        population: 0
      }
    }
  )
}
deleteCity(id:string){
this.cityService.deleteCity(id)
.subscribe(
  response=>{
    this.getAllCities();
  }
)
}

populate(city:City){
  this.city=city;
}
}
