import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';


import { LocationService } from './location.service';
import { ILocationResponse } from '../shared/interfaces/location-response.interface';

@Injectable({
  providedIn: 'root',
})
export class DestinationResolverService implements Resolve<ILocationResponse> {
  constructor(private getLocation: LocationService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ILocationResponse> {
    return this.getLocation.getDestinationData();
  }
}
