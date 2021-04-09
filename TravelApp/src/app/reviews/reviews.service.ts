import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { IUserReview } from '../shared/interfaces/user-review.interface';

@Injectable({
  providedIn: 'root',
})
export class ReviewsService {
  currentUser = {
    displayName: '',
    email: '',
    uid: '',
  };
  errorMessage: string = '';
  constructor(private _firebaseStore: AngularFirestore) {}

  getCollection(collection: string) {
    this.errorMessage = '';

    return this._firebaseStore
      .collection(collection)
      .snapshotChanges()
      .pipe(
        map((items) => {
          return items.map((doc) => {
            const data: any = doc.payload.doc.data();
            const id = doc.payload.doc.id;
            return {
              id,
              ...data,
            };
          });
        }),
        catchError(this.handleError)
      );
  }

  deleteItem(collection: string, id: string) {
    this.errorMessage = '';
    try {
      return this._firebaseStore.collection(collection).doc(id).delete();
    } catch {
      (error) => {
        this.errorMessage = error;
      };
    }
  }

  editItem(collection: string, id: string, data: IUserReview) {
    this.errorMessage = '';
    try {
      return this._firebaseStore.collection(collection).doc(id).update({
        rating: data.rating,
        opinion: data.opinion,
      });
    } catch {
      (error) => {
        this.errorMessage = error;
      };
    }
  }

  saveUserInfo(collection: string, data: any) {
    this.errorMessage = '';
    try {
      return this._firebaseStore.collection(collection).add(data);
    } catch {
      (error) => {
        this.errorMessage = error;
      };
    }
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      this.errorMessage = `An error has occurred during the processing: ${error.error.message}`;
    } else {
      this.errorMessage = `Server returned the following error: ${error.status}. Error message: ${error.message}`;
    }
    return throwError(this.errorMessage);
  }
}
