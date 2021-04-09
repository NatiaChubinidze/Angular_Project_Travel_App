import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ReviewsService } from '../reviews.service';
import { IUserReview } from 'src/app/shared/interfaces/user-review.interface';
import { FireBaseAuthService } from 'src/app/auth/firebase-auth.service';

@Component({
  selector: 'app-my-reviews',
  templateUrl: './my-reviews.component.html',
  styleUrls: ['./my-reviews.component.scss'],
})
export class MyReviewsComponent implements OnInit {
  reviewsArray: IUserReview[] = [];
  usersArray: any[] = [];
  currentReview: IUserReview = {
    uid: '',
    email: '',
    reviewAuthor: '',
    opinion: '',
    hotel: '',
    rating: 0,
  };
  currentUser = {
    displayName: '',
    email: '',
    uid: '',
  };

  value: Observable<number>;

  opinion: FormControl;
  hotel: FormControl;
  rating: FormControl;
  feedbackForm: FormGroup;

  buttonHover: boolean = false;
  editMode: boolean = false;
  errorMessage: string = '';
  constructor(
    private _firebaseAuth: FireBaseAuthService,
    public _reviewsService: ReviewsService
  ) {
    this._firebaseAuth.currentUser$.subscribe((data) => {
      this.currentUser.uid = this.currentReview.uid = data.uid;
      this.currentUser.email = this.currentReview.email = data.email;
      this.currentUser.displayName = this.currentReview.reviewAuthor =
        data.displayName;
    });

    this.opinion = new FormControl(
      '',
      Validators.compose([Validators.required, Validators.minLength(5)])
    );
    this.rating = new FormControl(
      null,
      Validators.compose([Validators.required])
    );

    this.hotel = new FormControl(
      null,
      Validators.compose([Validators.required])
    );
    this.feedbackForm = new FormGroup({
      opinion: this.opinion,
      rating: this.rating,
      hotel: this.hotel,
    });
  }

  opinionIsInvalid(): boolean {
    return this.opinion.invalid && (this.opinion.touched || this.buttonHover);
  }
  ratingIsInvalid(): boolean {
    return this.rating.invalid && this.buttonHover;
  }
  hotelIsInvalid(): boolean {
    return this.hotel.invalid && (this.hotel.touched || this.buttonHover);
  }

  ngOnInit(): void {
    this.loadData();
    this.value = this.feedbackForm.controls.rating.valueChanges;
  }

  loadData() {
    this._reviewsService
      .getCollection('reviews')
      .pipe(catchError(this.handleError))
      .subscribe((review) => {
        this.reviewsArray = review.filter(
          (item) => item.uid === this.currentReview.uid
        );
      });

    this._reviewsService
      .getCollection('users')
      .pipe(catchError(this.handleError))
      .subscribe((users) => {
        this.usersArray = users;
      });
  }

  editReview(review: IUserReview) {
    this.currentReview = review;
    this.rating.setValue(this.currentReview.rating);
    this.opinion.setValue(this.currentReview.opinion);
    this.hotel.setValue(this.currentReview.hotel);
    this.editMode = true;
  }

  deleteReview(review: IUserReview) {
    this.errorMessage = '';
    this._reviewsService.deleteItem('reviews', review.id).catch((err) => {
      this.errorMessage = err;
    });
  }

  onSubmit(event: any) {
    let newUser: boolean = true;
    this.usersArray.forEach((user) => {
      if (user.uid === this.currentUser.uid) {
        newUser = false;
      }
    });
    if (newUser) {
      this._reviewsService.saveUserInfo('users', this.currentUser);
    }

    this.currentReview.rating = this.rating.value;
    this.currentReview.opinion = this.opinion.value;
    this.currentReview.hotel = this.hotel.value;
    if (this.editMode) {
      this.saveEdit();
      this.editMode = false;
    } else {
      this.saveToDatabase();
      this.reviewsArray.push(this.currentReview);
    }
    this.resetForm();
  }

  saveEdit() {
    this._reviewsService.editItem(
      'reviews',
      this.currentReview.id,
      this.currentReview
    );
  }

  saveToDatabase() {
    this._reviewsService.saveUserInfo('reviews', this.currentReview);
  }

  resetForm() {
    console.log('resetting');
    this.currentReview.opinion = '';
    this.currentReview.rating = 0;
    this.rating.setValue(0);
    this.opinion.setValue('');
    this.hotel.setValue('');
    this.feedbackForm.reset();
  }

  private handleError(error: HttpErrorResponse) {
    this.errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      this.errorMessage = `An error has occurred during the processing: ${error.error.message}`;
    } else {
      this.errorMessage = `Server returned the following error: ${error.status}. Error message: ${error.message}`;
    }
    return throwError(this.errorMessage);
  }
}
