import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  ILocationResponse,
  IQuery,
  ISuggestionItem,
} from '../shared/location-response.interface';
import { LocationService } from '../home/location.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.scss'],
})
export class DestinationComponent implements OnInit {
  queryData: IQuery={
    query:"",
    checkIn:"",
    checkOut:"",
  };

  citiesArray: ISuggestionItem[];
  hotelsArray: ISuggestionItem[];
  landmarksArray: ISuggestionItem[];
  transportsArray: ISuggestionItem[];
  cityId: string;
  result: ILocationResponse;
  constructor(
    private _router: ActivatedRoute,
    private getLocation: LocationService,
    private _datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    console.log(this.queryData)
    this.queryData.query = this._router.snapshot.paramMap.get('query');
    this.queryData.checkIn = this._datePipe.transform(
      this._router.snapshot.paramMap.get('checkIn'),
      'yyyy-MM-dd'
    );
    this.queryData.checkOut = this._datePipe.transform(
      this._router.snapshot.paramMap.get('checkOut'),
      'yyyy-MM-dd'
    );
   
    let adultsNumber= parseInt(
      this._router.snapshot.paramMap.get('adults1'));
      this.queryData.adults1=adultsNumber<=0 || adultsNumber===undefined?1:adultsNumber;
    console.log(this.queryData.query);
    console.log(this.queryData.checkIn);
    console.log(this.queryData.checkOut);
    console.log(this.queryData.adults1);

    this.getData();
  }


  getData() {
    console.log('submiting and getting data');
    this.getLocation
      .getDestinationData(this.queryData.query)
      .subscribe((data: ILocationResponse) => {
        
          console.log('dividing');
          console.log(data);
          data.suggestions.forEach((suggestion) => {
            if (suggestion.group === 'LANDMARK_GROUP') {
              this.landmarksArray = suggestion.entities;
            } else if (suggestion.group === 'TRANSPORT_GROUP') {
              this.transportsArray = suggestion.entities;
            } else if (suggestion.group === 'HOTEL_GROUP') {
              this.hotelsArray = suggestion.entities;
            } else {
              this.citiesArray = suggestion.entities;
            }
          });
          console.log(this.citiesArray);
          console.log(this.landmarksArray);
          console.log(this.transportsArray);
          console.log(this.hotelsArray);
          this.citiesArray.forEach((item) => {
            if (item.name.toLowerCase() === this.queryData.query.toLowerCase()) {
              this.cityId = item.destinationId;
              console.log(item.name, 'matching');
            }
          });
        }
        
        
      );
  }

  
}
