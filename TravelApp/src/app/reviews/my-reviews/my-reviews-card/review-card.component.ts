import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IUserReview } from 'src/app/shared/interfaces/user-review.interface';

@Component({
  selector: 'app-review-card',
  templateUrl: './review-card.component.html',
  styleUrls: ['./review-card.component.scss']
})
export class ReviewCardComponent implements OnInit {

  @Input() review: IUserReview;

  @Output() onEditClick = new EventEmitter();
  @Output() onDeleteClick = new EventEmitter();


  constructor() {}

  ngOnInit(): void {}

  onEditIconClick() {
    this.onEditClick.emit(this.review);
  }
  onDeleteIconClick(){
    this.onDeleteClick.emit(this.review);
  }

}
