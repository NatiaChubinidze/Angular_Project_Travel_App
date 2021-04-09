import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

import { FireBaseAuthService } from '../auth/firebase-auth.service';


@Injectable({
  providedIn: 'root',
})
export class HomeGuard implements CanActivate {
  constructor(
    private firebaseAuth: FireBaseAuthService,
    private router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.firebaseAuth.userIsLoggedIn) {
      this.router.navigate(['/signIn']);
      return false;
    }
    return this.firebaseAuth.userIsLoggedIn;
  }
}
