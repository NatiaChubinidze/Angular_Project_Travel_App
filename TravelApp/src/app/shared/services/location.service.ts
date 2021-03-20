import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { ILocationResponse } from '../interfaces/location-response.interface';
import { IPropertiesResponse } from '../interfaces/properties-list-response.interface';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  baseUrl="https://hotels4.p.rapidapi.com";
  constructor(private http:HttpClient) { }

  getDestinationData(q: string): Observable<ILocationResponse> {
    const query=q.replace(/\s/g, '%20');
    return this.http
      .get<ILocationResponse>(
        `${this.baseUrl}/locations/search?query=${query}&locale=en_US`
      )
      .pipe(tap((data) => {}, catchError(this.handleError)));
  }

  getPropertiesList(destinationId:number,checkIn:string,checkOut:string,adults1:number):Observable<IPropertiesResponse>{
    return this.http
      .get<IPropertiesResponse>(
        `${this.baseUrl}/properties/list?destinationId=${destinationId}&pageNumber=1&checkIn=${checkIn}&checkOut=${checkOut}&pageSize=25&adults1=${adults1}&locale=en_US`
      )
      .pipe(tap((data) => {}, catchError(this.handleError)));
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
