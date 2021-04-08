import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import {RouterModule} from "@angular/router";
import { NgxInputStarRatingModule } from '@ngx-lite/input-star-rating';
import { UsersDashboardComponent } from './admin-reviews/users-dashboard.component';
import { MyReviewsComponent } from './my-reviews/my-reviews.component';
import { ReviewCardComponent } from './my-reviews/my-reviews-card/review-card.component';
import { UserFeedbackComponent } from './admin-reviews/user-feedback/user-feedback.component';



@NgModule({
  declarations: [
    UsersDashboardComponent,
    MyReviewsComponent,
    ReviewCardComponent,
    UserFeedbackComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgxInputStarRatingModule,
    RouterModule.forChild([
      {
        path:'myReviews',
        component:MyReviewsComponent
      },
      {
        path:'reviews',
        component:UsersDashboardComponent
      },
      {
        path:'feedback',
        component:UserFeedbackComponent
      },
  ])
  ]
})
export class ReviewsModule { }
