import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocationService } from '../destination/location.service';
import { ILocationResponse, IQuery} from '../shared/interfaces/location-response.interface';
import { IPropertiesResponse } from '../shared/interfaces/properties-list-response.interface';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private _router: ActivatedRoute,
    public getLocation: LocationService,
    private _datePipe: DatePipe) { }

  ngOnInit(): void {
  }

  
onSubmit(){
  this.getLocation.queryData.checkIn = this._datePipe.transform(
    this.getLocation.queryData.checkIn,
    'yyyy-MM-dd'
  );
  this.getLocation.queryData.checkOut = this._datePipe.transform(
    this.getLocation.queryData.checkOut,
    'yyyy-MM-dd'
  );
  let adultsNumber=this.getLocation.queryData.adults1;
  this.getLocation.queryData.adults1= adultsNumber <= 0 || adultsNumber === undefined ? 1 : adultsNumber;

  //this.getData();
}


// getData() {
//   console.log('submiting and getting data');
//   this.getLocation
//     .getDestinationData(this.getLocation.queryData.query)
//     .subscribe((data: ILocationResponse) => {
//       data.suggestions.forEach((suggestion) => {
//         if (suggestion.group === 'TRANSPORT_GROUP') {
//           this.getLocation.transportsArray = suggestion.entities;
//         } else if (suggestion.group === 'CITY_GROUP') {
//           this.getLocation.citiesArray = suggestion.entities;
//           console.log("cities array",this.getLocation.citiesArray);
//         }
        
//       });

    //   this.getLocation.citiesArray.forEach((item) => {
    //     if (item.name.toLowerCase() === this.getLocation.queryData.query.toLowerCase()) {
    //       this.getLocation.cityId = parseInt(item.destinationId);
          
    //     }
    //   });
    //   this.getPropertiesList();
    // });
    
//}

// getPropertiesList(){
//   if(this.getLocation.cityId){
//     console.log(this.getLocation.cityId,"getting properties");
//     this.getLocation.getPropertiesList(this.getLocation.cityId,this.getLocation.queryData.checkIn,this.getLocation.queryData.checkOut,this.getLocation.queryData.adults1).subscribe((info:IPropertiesResponse)=>{
//       console.log(info);
//       this.getLocation.hotelsArray=info.data.body.searchResults.results;
//       this.getLocation.hotelsArray.sort((a,b)=>b.starRating-a.starRating);
//       console.log(this.getLocation.hotelsArray);
//       console.log(info.data.body);
//       this.getLocation.landmarksArray=info.data.body.filters.landmarks.items;
//     })
//   }
// }




}
