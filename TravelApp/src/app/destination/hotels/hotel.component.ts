import { Component, Input, OnInit } from '@angular/core';
import { IResultInterface } from 'src/app/shared/interfaces/properties-list-response.interface';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { IQuery } from '../../shared/interfaces/location-response.interface';
import { LocationService } from '../location.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.scss'],
})
export class HotelComponent implements OnInit {
  hotelsArray: IResultInterface[];
  destination: string;
  queryData: IQuery;

  clonedHotelsArray: IResultInterface[];
  hotelId: number;
  counter: number = 0;
  
  searchTerm: string = '';
  sortByDesc: boolean = true;
  
  constructor(private getLocation: LocationService,private _activeRoute: ActivatedRoute) {
    this.destination=this.getLocation.queryData.query;
    this.queryData=this.getLocation.queryData;
    const result=this._activeRoute.snapshot.data['hotelsData'];
    this.getLocation.hotelsArray=result.data.body.searchResults.results;
    this.getLocation.hotelsArray.sort((a,b)=>b.starRating-a.starRating);
    this.hotelsArray=this.clonedHotelsArray=this.getLocation.hotelsArray.slice();
  }
  ratingForm: FormGroup;
  stars: FormControl;

  ngOnInit(): void {
    this.stars = new FormControl('');
    this.ratingForm = new FormGroup({
      stars: this.stars,
    });
  }
  changeStars(event: any) {
    if (event.target.value) {
      if (!this.clonedHotelsArray) {
        this.clonedHotelsArray = this.hotelsArray;
      } else {
        this.hotelsArray = this.clonedHotelsArray;
      }
      console.log(this.clonedHotelsArray);
      console.log(this.hotelsArray);
      this.stars.setValue(event.target.value);
      console.log(event.target.value);
      console.log(this.stars.value);

      const arr = this.hotelsArray.filter(
        (hotel) => Math.ceil(hotel.starRating) == this.stars.value
      );
      this.hotelsArray = arr;
    } else {
      this.hotelsArray = this.clonedHotelsArray;
    }
  }
  toggleSortBy() {
    this.sortByDesc = !this.sortByDesc;
    this.arraySort();
  }
  arraySort() {
    if (this.sortByDesc) {
      this.hotelsArray.sort((a, b) => b.starRating - a.starRating);
    } else {
      this.hotelsArray.sort((a, b) => a.starRating - b.starRating);
    }
  }

  handleChange() {
    console.log('on change');

    if (this.counter === 0) {
      this.clonedHotelsArray = this.hotelsArray.slice();
      this.counter++;
      return;
    }
    if (this.searchTerm) {
      this.hotelsArray = this.clonedHotelsArray.slice();
      const filteredArray = this.hotelsArray.filter((hotel) => {
        return (
          this.searchTerm.toLowerCase() === hotel.name.toLowerCase() ||
          hotel.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      });
      this.hotelsArray = filteredArray.slice();
    } else {
      this.hotelsArray = this.clonedHotelsArray.slice();
    }

    this.arraySort();
  }
}
