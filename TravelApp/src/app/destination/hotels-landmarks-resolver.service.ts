import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { IDetailsResponse } from '../shared/interfaces/hotel-details.interface';
import { LocationService } from './location.service';
import { ILocationResponse } from '../shared/interfaces/location-response.interface';
import { IPropertiesResponse } from '../shared/interfaces/properties-list-response.interface';



@Injectable({
  providedIn: 'root',
})
export class HotelsLandmarksResolverService implements Resolve<IPropertiesResponse> {
  constructor(private getLocation: LocationService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IPropertiesResponse> {
   
    return this.getLocation.getPropertiesList();
}
}
