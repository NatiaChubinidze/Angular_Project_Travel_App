import { Component, Input, OnInit } from '@angular/core';
import { IItems } from 'src/app/shared/interfaces/properties-list-response.interface';

import { ISuggestionItem } from '../../shared/interfaces/location-response.interface';

@Component({
  selector: 'app-landmarks',
  templateUrl: './landmarks.component.html',
  styleUrls: ['./landmarks.component.scss'],
})
export class LandmarksComponent implements OnInit {
  @Input() destination: string = 'Tbilisi';
  @Input() landmarks?: IItems[];
  clonedLandmarks: IItems[];
  p: number = 1;
  counter: number = 0;
  searchTerm: string = '';

  constructor() {}

  ngOnInit(): void {}

  handleChange() {
    console.log('on change');
    if (this.counter === 0) {
      this.clonedLandmarks = this.landmarks.slice();
      this.counter++;
      return;
    }
    if (this.searchTerm) {
      this.landmarks = this.clonedLandmarks.slice();
      const filteredLandmarks = this.landmarks.filter((landmark) => {
        return (
          this.searchTerm.toLowerCase() === landmark.label.toLowerCase() ||
          landmark.label.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      });
      this.landmarks = filteredLandmarks.slice();
    } else {
      this.landmarks = this.clonedLandmarks.slice();
    }
  }
}
