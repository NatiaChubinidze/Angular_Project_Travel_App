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

hotelArr=[{thumbnailUrl:"https://image.flaticon.com/icons/png/128/3754/3754197.png",
address:{
  streetAddress:"jskdjksjdksjkd",
  locality:"skdjksjdksjd"
},
name:"hotel motels hostel",
starRating:5},
{
address:{
  streetAddress:"jskdjksjdksjkd",
  locality:"skdjksjdksjd"
},
name:"hotel motels hostel",
starRating:5},
{
address:{
  streetAddress:"jskdjksjdksjkd",
  locality:"skdjksjdksjd"
},
name:"hotel motels hostel",
starRating:5}]
  constructor() { }

  ngOnInit(): void {
   
  }

}
