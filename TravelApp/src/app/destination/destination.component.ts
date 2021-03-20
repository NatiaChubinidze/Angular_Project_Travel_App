import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  ILocationResponse,
  IQuery,
  ISuggestionItem,
} from '../shared/interfaces/location-response.interface';
import { LocationService } from '../shared/services/location.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.scss'],
})
export class DestinationComponent implements OnInit {
  queryData: IQuery = {
    query: '',
    checkIn: '',
    checkOut: '',
  };

  citiesArray: ISuggestionItem[];
  hotelsArray: ISuggestionItem[];
  landmarksArray: ISuggestionItem[];
  transportsArray: ISuggestionItem[];
  cityId: string;

  visibility = {
    landmarks: true,
    transport: false,
    hotels: false,
  };

  constructor(
    private _router: ActivatedRoute,
    private getLocation: LocationService,
    private _datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.queryData.query = this._router.snapshot.paramMap.get('query');
    this.queryData.checkIn = this._datePipe.transform(
      this._router.snapshot.paramMap.get('checkIn'),
      'yyyy-MM-dd'
    );
    this.queryData.checkOut = this._datePipe.transform(
      this._router.snapshot.paramMap.get('checkOut'),
      'yyyy-MM-dd'
    );

    let adultsNumber = parseInt(this._router.snapshot.paramMap.get('adults1'));
    this.queryData.adults1 =
      adultsNumber <= 0 || adultsNumber === undefined ? 1 : adultsNumber;
    this.getData();
  }

  getData() {
    console.log('submiting and getting data');
    this.getLocation
      .getDestinationData(this.queryData.query)
      .subscribe((data: ILocationResponse) => {
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

        this.citiesArray.forEach((item) => {
          if (item.name.toLowerCase() === this.queryData.query.toLowerCase()) {
            this.cityId = item.destinationId;
          }
        });
      });
  }
  toggleVisibility(event):void{
    if(event.target.nodeName==="BUTTON"){
    const toAppear = event.target.innerHTML.toLowerCase();
    Object.keys(this.visibility).forEach(key=>{
      this.visibility[key]=false;
    })
    this.visibility[toAppear]=true;
    }
    
  }
}
