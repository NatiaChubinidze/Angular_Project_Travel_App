import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Observer, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { ILocationResponse, IQuery, ISuggestionItem } from '../shared/interfaces/location-response.interface';
import { IItems, IPropertiesResponse, IResultInterface } from '../shared/interfaces/properties-list-response.interface';
import { IDetailsResponse } from '../shared/interfaces/hotel-details.interface';
import { IPhotos } from '../shared/interfaces/hotel-Images.interface';
import { IReviewsResponse } from '../shared/interfaces/reviews.interface';

@Injectable({
  providedIn: 'root',
})
export class LocationService {

  queryData: IQuery = {
    query: '',
    checkIn: '',
    checkOut: '',
  };
dataIsValid:boolean=false;
  citiesArray: ISuggestionItem[];
  hotelsArray: IResultInterface[];
  landmarksArray:IItems[];
  transportsArray: ISuggestionItem[];

  cityId: number;



  baseUrl = 'https://hotels4.p.rapidapi.com';
  constructor(private http: HttpClient) {}

  getDestinationData(): Observable<ILocationResponse> {
    console.log("getting destination data");
    console.log(this.queryData);
    return this.http
      .get<ILocationResponse>(
        `${this.baseUrl}/locations/search?query=${this.queryData.query}&locale=en_US`
      )
      .pipe(tap((data) => {}, catchError(this.handleError)));
  }

  getPropertiesList(): Observable<IPropertiesResponse> {
    return this.http
      .get<IPropertiesResponse>(
        `${this.baseUrl}/properties/list?destinationId=${this.cityId}&pageNumber=1&checkIn=${this.queryData.checkIn}&checkOut=${this.queryData.checkOut}&pageSize=25&adults1=${this.queryData.adults1}&locale=en_US`
      )
      .pipe(tap((data) => {}, catchError(this.handleError)));
  }

  getDetailedInfo(
    hotelId: number
  ): Observable<IDetailsResponse> {
    return this.http
      .get<IDetailsResponse>(
        `${this.baseUrl}/properties/get-details?id=${hotelId}&locale=en_US&currency=USD&checkOut=${this.queryData.checkOut}&adults1=${this.queryData.adults1}&checkIn=${this.queryData.checkIn}`
      )
      .pipe(tap((data) => {}, catchError(this.handleError)));
  }

  getPhotos(hotelId: number): Observable<IPhotos> {
    return this.http
      .get<IPhotos>(`${this.baseUrl}/properties/get-hotel-photos?id=${hotelId}`)
      .pipe(tap((data) => {}, catchError(this.handleError)));
  }

  getReviews(hotelId: number): Observable<IReviewsResponse> {
    return this.http
      .get<IReviewsResponse>(
        `${this.baseUrl}/reviews/list?id=${hotelId}&page=1&loc=en_US`
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
