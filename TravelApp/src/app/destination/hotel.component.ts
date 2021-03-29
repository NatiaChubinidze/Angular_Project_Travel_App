import { Component, Input, OnInit } from '@angular/core';
import { IQuery, ISuggestionItem } from '../shared/interfaces/location-response.interface';


@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.scss']
})
export class HotelComponent implements OnInit {
@Input() hotelsArray:ISuggestionItem[];
@Input() destination:string;
@Input() queryData: IQuery;
 hotelId:number;

  constructor() { }

  ngOnInit(): void {
   
  }

}
