import { Component, OnInit } from '@angular/core';
import { ILocationResponse, ISuggestion, ISuggestionItem } from '../shared/location-response.interface';
import { LocationService } from './location.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
citiesArray:ISuggestionItem[];
hotelsArray:ISuggestionItem[];
landmarksArray:ISuggestionItem[];
transportsArray:ISuggestionItem[];

query:string="";

  constructor(private getLocation:LocationService) { }

  ngOnInit(): void {

  }
onSubmit(){
  console.log("submiting and getting data");
  this.getLocation.getDestinationData(this.query).subscribe((data:ILocationResponse)=>{
    this.citiesArray=data.suggestions[0].entities;
    this.hotelsArray=data.suggestions[1].entities;
    this.landmarksArray=data.suggestions[2].entities;
    this.transportsArray=data.suggestions[3].entities;
    console.log(this.citiesArray);
  })
//   fetch("https://hotels4.p.rapidapi.com/locations/search?query=tbilisi&locale=en_US", {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-key": "272fed8f58msh8e4b690dee67116p10ffe8jsn96b825cee07d",
// 		"x-rapidapi-host": "hotels4.p.rapidapi.com"
// 	}
// })
// .then(response => 
// 	response.json()
// ).then(result=>{console.log(result)})
}
}
