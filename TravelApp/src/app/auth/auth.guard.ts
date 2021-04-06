import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { FireBaseAuthService } from './firebase-auth.service';

import {LocationService} from '../destination/location.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private firebaseAuth:FireBaseAuthService, private locationService:LocationService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let queryExists:boolean=false;
    if(this.locationService.queryData.query && this.locationService.queryData.checkIn && this.locationService.queryData.checkOut){
      queryExists=true;
    }
      return this.firebaseAuth.userIsActive() && queryExists;
  }
  
}
