import { Component, OnInit } from '@angular/core';
import { CitiesService } from './service/cities.service';
import { City } from 'src/models/city.model';

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

  constructor(private cityService: CitiesService){

  }

  ngOnInit(): void {
    this.getAllCities();
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
