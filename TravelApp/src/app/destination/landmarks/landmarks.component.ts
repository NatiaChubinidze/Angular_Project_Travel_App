import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IItems } from 'src/app/shared/interfaces/properties-list-response.interface';
import { LocationService } from '../location.service';

@Component({
  selector: 'app-landmarks',
  templateUrl: './landmarks.component.html',
  styleUrls: ['./landmarks.component.scss'],
})
export class LandmarksComponent implements OnInit {
  destination: string = '';
  landmarks?: IItems[];

  clonedLandmarks: IItems[];
  p: number = 1;
  counter: number = 0;
  searchTerm: string = '';

  constructor(
    private getLocation: LocationService,
    private _activeRoute: ActivatedRoute
  ) {
    this.destination = this.getLocation.queryData.query;
    const result = this._activeRoute.snapshot.data['landmarksData'];
    this.getLocation.landmarksArray = this.landmarks = this.clonedLandmarks =
      result.data.body.filters.landmarks.items;
  }

  ngOnInit(): void {}

  handleChange() {
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
