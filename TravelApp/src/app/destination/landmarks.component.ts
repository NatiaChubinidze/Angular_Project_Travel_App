import { Component, Input, OnInit } from '@angular/core';

import { ISuggestionItem } from '../shared/location-response.interface';

@Component({
  selector: 'app-landmarks',
  templateUrl: './landmarks.component.html',
  styleUrls: ['./landmarks.component.scss']
})
export class LandmarksComponent implements OnInit {
@Input() destination:string="Tbilisi";
@Input() landmarks:ISuggestionItem[];
  constructor() { }

  ngOnInit(): void {
  }

}
