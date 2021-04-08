import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { IUserReview } from 'src/app/shared/interfaces/user-review.interface';
import { ReviewsService } from '../../reviews.service';

@Component({
  selector: 'app-user-feedback',
  templateUrl: './user-feedback.component.html',
  styleUrls: ['./user-feedback.component.scss']
})
export class UserFeedbackComponent implements OnInit {
  feedbackArray:IUserReview[]=[];
  constructor(private _reviewsService: ReviewsService) { }

  ngOnInit(): void {
    this._reviewsService
      .getCollection('reviews')
      .subscribe((review) => {
        this.feedbackArray = review.filter(
          (item) => item.uid === this._reviewsService.currentUser.uid
        );
      });

  }
  

}

