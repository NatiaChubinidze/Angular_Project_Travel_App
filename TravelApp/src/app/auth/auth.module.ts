import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';


import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';


@NgModule({
  declarations: [SignInComponent, SignUpComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    NgxAuthFirebaseUIModule,
    RouterModule.forChild([
      {
        path: 'signIn',
        component: SignInComponent,
      },
      {
        path: 'signUp',
        component: SignUpComponent,
      },
      {
        path: '',
        redirectTo: 'signIn',
        pathMatch: 'full',
      },
    ]),
  ],
})
export class AuthModule {}
