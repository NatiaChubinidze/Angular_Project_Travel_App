import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import firebase from 'firebase/app';

import {
    TRAVEL_APP_KEY,
    TRAVEL_TOKEN_EXP_KEY,
  TOKEN_TTL,
} from '../shared/constants';
import { IUserInfo } from '../shared/interfaces/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class FireBaseAuthService {
  currentUser$ = new Observable<firebase.User | null>();
  userIsLoggedIn:boolean=false;
  githubAuth: boolean;
  googleAuth: boolean;
  errorMessage: string;
  constructor(private _router: Router, private auth: AngularFireAuth) {
    this.currentUser$ = this.auth.authState;
  }
  
  setTokenValidTime():void{
    const date = new Date();
    date.setMinutes(new Date().getMinutes()+TOKEN_TTL);
    localStorage.setItem(TRAVEL_TOKEN_EXP_KEY,date.toJSON());
  }

  tokenIsValid():boolean{
    const timeNow = new Date().getTime();
    const tokenValidTill=new Date(localStorage.getItem(TRAVEL_TOKEN_EXP_KEY)).getTime();
    return timeNow < tokenValidTill;
  }
  
  authIsSecure():boolean{
    const timeNow=new Date().getTime();
    const tokenValidTill=new Date(localStorage.getItem(TRAVEL_TOKEN_EXP_KEY)).getTime();
    return tokenValidTill - timeNow > 30000;
    }

    signOut(): void {
        console.log('auth sign out firebase');
        this.auth.signOut();
        if (localStorage.getItem(TRAVEL_APP_KEY)) {
          localStorage.removeItem(TRAVEL_APP_KEY);
        }
        if (localStorage.getItem(TRAVEL_TOKEN_EXP_KEY)) {
          localStorage.removeItem(TRAVEL_TOKEN_EXP_KEY);
        }
        this.userIsLoggedIn=false;
        this._router.navigate(['/signIn']);
      }

  isSignedIn():boolean{
    if(localStorage.getItem(TRAVEL_APP_KEY)){
      return true;
    } else return false;
  }

  signInGithub() {
    this.errorMessage = null;
    this.githubAuth = true;
    this.auth
      .signInWithPopup(new firebase.auth.GithubAuthProvider())
      .then((data: any) => {
        if (data.credential.accessToken) {
          this.userIsLoggedIn=true;
          this._router.navigate(['/home']);
        }
      })
      .catch((error) => {
        this.errorMessage = error.message;
      });
  }

  signInGoogle() {
    this.errorMessage = null;
    this.googleAuth = true;
    this.auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((data: any) => {
        if (data.credential.accessToken) {
          this.userIsLoggedIn=true;
          this._router.navigate(['/home']);
        }
      })
      .catch((error) => {
        this.errorMessage = error.message;
      });
  }

  signInFacebook() {
    this.errorMessage = null;
    this.auth
      .signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then((data: any) => {
        if (data.credential.accessToken) {
          this.userIsLoggedIn=true;
          this._router.navigate(['/home']);
        }
      })
      .catch((error) => {
        this.errorMessage = error.message;
      });
  }

  signInEmail(data: IUserInfo) {
    this.errorMessage = null;
    this.auth
      .signInWithEmailAndPassword(data.email, data.password)
      .then((userInfo) => {
        console.log(userInfo);
        if (userInfo.user) {
          this.userIsLoggedIn=true;
          localStorage.setItem(TRAVEL_APP_KEY, userInfo.user.refreshToken);
          this.setTokenValidTime();
          this._router.navigate(['/home']);
        }
      })
      .catch((error) => {
        this.errorMessage = error.message;
      });
  }

  register(userInfo) {
    this.errorMessage = null;
    this.auth
      .createUserWithEmailAndPassword(userInfo.email, userInfo.password)
      .then((data) => {
        console.log(data);
        if (data.user) {
          localStorage.setItem(TRAVEL_APP_KEY, data.user.refreshToken);
          this.setTokenValidTime();
          this._router.navigate(['/home']);
        }
      })
      .catch((error) => {
        this.errorMessage = error.message;
      });
  }

  userIsActive() {
    return this.currentUser$.pipe(
      map((userInfo: any) => {
        if (userInfo && userInfo.uid) {
          return true;
        } else {
          this._router.navigate(['/signIn']);
          return false;
        }
      })
    );
  }
}
