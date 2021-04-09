import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { FireBaseAuthService } from 'src/app/auth/firebase-auth.service';
import { ReviewsService } from '../reviews.service';


@Component({
  selector: 'app-users-dashboard',
  templateUrl: './users-dashboard.component.html',
  styleUrls: ['./users-dashboard.component.scss'],
})
export class UsersDashboardComponent implements OnInit {
  usersArray: any[] = [];
  uidArray: any[] = [];
  constructor(
    private _firebaseAuth: FireBaseAuthService,
    public _reviewsService: ReviewsService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this._reviewsService
      .getCollection('users')
      .pipe(catchError(this.handleError))
      .subscribe((users) => {
        users.forEach((item) => {
          if (!this.uidArray.includes(item.uid)) {
            this.uidArray.push(item.uid);
            this.usersArray.push(item);
          }
        });
      });
  }

  onClick(user: any) {
    this._reviewsService.currentUser = user;
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
