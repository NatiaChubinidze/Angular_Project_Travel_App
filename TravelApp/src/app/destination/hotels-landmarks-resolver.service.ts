import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

import { LocationService } from './location.service';
import { IPropertiesResponse } from '../shared/interfaces/properties-list-response.interface';


@Injectable({
  providedIn: 'root',
})
export class HotelsLandmarksResolverService
  implements Resolve<IPropertiesResponse> {
  constructor(private getLocation: LocationService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IPropertiesResponse> {
    return this.getLocation.getPropertiesList();
  }
}
