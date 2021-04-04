import { Component, OnInit } from '@angular/core';
import {
  IBody,
  IDetailsResponse,
  ITransportLocation,
  ITrustReviews,
} from 'src/app/shared/interfaces/hotel-details.interface';
import { IQuery } from 'src/app/shared/interfaces/location-response.interface';
import { LocationService } from 'src/app/destination/location.service';
import { ActivatedRoute } from '@angular/router';
import { IPhotos } from 'src/app/shared/interfaces/hotel-Images.interface';
import { IReview, IReviewsResponse } from 'src/app/shared/interfaces/reviews.interface';
@Component({
  selector: 'app-hotel-details',
  templateUrl: './hotel-details.component.html',
  styleUrls: ['./hotel-details.component.scss'],
})
export class HotelDetailsComponent implements OnInit {
  queryData: IQuery = {
    query: '',
    checkIn: '',
    checkOut: '',
  };
  hotelId: number;
  images:string[];
  dataArray?: IBody;
  transportsArray?: ITransportLocation[];
  reviewsArray?:IReview[];
  neighborhood: string;
  constructor(
    private locationService: LocationService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.queryData.query = this._route.snapshot.paramMap.get('query');
    this.queryData.checkIn = this._route.snapshot.paramMap.get('checkIn');
    this.queryData.checkOut = this._route.snapshot.paramMap.get('checkOut');
    this.queryData.adults1 = parseInt(
      this._route.snapshot.paramMap.get('adults1')
    );
    this.hotelId = parseInt(this._route.snapshot.paramMap.get('hotelId'));
    this.locationService
      .getDetailedInfo(
        this.hotelId,
        this.queryData.checkIn,
        this.queryData.checkOut,
        this.queryData.adults1
      )
      .subscribe((data: IDetailsResponse) => {
        this.dataArray = data.data.body;
        console.log(this.dataArray.propertyDescription.featuredPrice.oldPrice);
        console.log(this.hotelId);
        console.log(this.dataArray);
        this.transportsArray = data.transportation.transportLocations;
        this.neighborhood = data.neighborhood.neighborhoodName;
        this.locationService
          .getPhotos(this.hotelId)
          .subscribe((photos: IPhotos) => {
             const arr = photos.hotelImages.slice(0,8);
             this.images=arr.map(photo=>{ return photo.baseUrl.substring(0, photo.baseUrl.length - 11)
             .concat(photo.baseUrl.substring(photo.baseUrl.length - 4));})
            
              this.locationService.getReviews(this.hotelId).subscribe((reviews:IReviewsResponse)=>{
                this.reviewsArray=reviews.reviewData.guestReviewGroups.guestReviews[0].reviews;
              })
          });
      });
  }
}
