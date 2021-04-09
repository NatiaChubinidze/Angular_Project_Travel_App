import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISuggestionItem } from '../../shared/interfaces/location-response.interface';
import { LocationService } from '../location.service';

@Component({
  selector: 'app-transport',
  templateUrl: './transport.component.html',
  styleUrls: ['./transport.component.scss'],
})
export class TransportComponent implements OnInit {
  transportArray: ISuggestionItem[];
  destination: string;

  constructor(
    private getLocation: LocationService,
    private _activeRoute: ActivatedRoute
  ) {
    this.destination = this.getLocation.queryData.query;
    const result = this._activeRoute.snapshot.data['destinationResponse'];
    result.suggestions.forEach((suggestion) => {
      if (suggestion.group === 'TRANSPORT_GROUP') {
        this.transportArray = this.getLocation.transportsArray =
          suggestion.entities;
      } else if (suggestion.group === 'CITY_GROUP') {
        this.getLocation.citiesArray = suggestion.entities;
      }
    });

    this.getLocation.citiesArray.forEach((item) => {
      if (
        item.name.toLowerCase() ===
        this.getLocation.queryData.query.toLowerCase()
      ) {
        this.getLocation.cityId = parseInt(item.destinationId);
      }
    });
  }

  ngOnInit(): void {}
}
