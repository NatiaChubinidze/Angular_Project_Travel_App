import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, map,catchError } from 'rxjs/operators';

import { IRegisterResponse, IToken, IUserInfo } from '../shared/interfaces/auth.interface';

import {
    TRAVEL_APP_KEY,
    TRAVEL_TOKEN_EXP_KEY,
  TOKEN_TTL,
} from '../shared/constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _baseURL = 'https://reqres.in';
  
  constructor(private http: HttpClient) {}

  getLoginToken(inputData:IUserInfo): Observable<boolean> {
    console.log("getting token");
    const data = JSON.stringify(inputData);
    return this.http.post<IToken>(`${this._baseURL}/api/login`,data)
      .pipe(
        tap((data) => {
          localStorage.setItem(TRAVEL_APP_KEY, data.token);
          this.setTokenValidTime();
        }),catchError(this.handleError),
        map((data) => {
          if (data.token) {
            return true;
          } else {
            return false;
          }
        })
      );
  }

  getRegisterToken(inputData:IUserInfo):Observable<boolean>{
    const data = JSON.stringify(inputData);
    return this.http.post<IRegisterResponse>(`${this._baseURL}/api/register`, data)
    .pipe( tap((data) => {
        localStorage.setItem(TRAVEL_APP_KEY, data.token);
        this.setTokenValidTime();
      }),catchError(this.handleError),
      map((data) => {
        if (data.token) {
          return true;
        } else {
          return false;
        }
      }));
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

  signOut():void{
    localStorage.removeItem(TRAVEL_APP_KEY);
    localStorage.removeItem(TRAVEL_TOKEN_EXP_KEY);
  }

  isSignedIn():boolean{
    if(localStorage.getItem(TRAVEL_APP_KEY)){
      return true;
    } else return false;
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `An error has occurred during the processing: ${error.error.message}`;
    } else {
      errorMessage = `Server returned the following error: ${error.status}. Error message: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}