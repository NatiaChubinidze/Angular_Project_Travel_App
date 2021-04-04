import { Component, Input, OnInit } from '@angular/core';
import { ISuggestionItem } from '../../shared/interfaces/location-response.interface';

@Component({
  selector: 'app-transport',
  templateUrl: './transport.component.html',
  styleUrls: ['./transport.component.scss']
})
export class TransportComponent implements OnInit {
@Input() transportArray:ISuggestionItem[];
@Input() destination:string;
  constructor() { }

  ngOnInit(): void {
  }

}
