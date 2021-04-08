import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { FireBaseAuthService } from './firebase-auth.service';
import {Router} from '@angular/router'
import {LocationService} from '../destination/location.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private firebaseAuth:FireBaseAuthService, private locationService:LocationService,
    private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!(this.firebaseAuth.userIsActive() && this.locationService.dataIsValid)){
        this.router.navigate(['/signIn']);
        return false;
      }
      return this.firebaseAuth.userIsActive() && this.locationService.dataIsValid;
  }
  
}
