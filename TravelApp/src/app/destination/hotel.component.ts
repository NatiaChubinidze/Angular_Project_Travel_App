import { Component, Input, OnInit } from '@angular/core';
import { ISuggestionItem } from '../shared/location-response.interface';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.scss']
})
export class HotelComponent implements OnInit {
@Input() hotelsArray:ISuggestionItem[];
@Input() destination:string;
  constructor() { }

  ngOnInit(): void {
  }

}
