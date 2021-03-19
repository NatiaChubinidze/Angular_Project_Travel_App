import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

@NgModule({
  declarations: [SignInComponent, SignUpComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { 
      path: 'signIn', 
      component: SignInComponent,
    },
    { 
      path: 'signUp', 
      component: SignUpComponent,
    },
    ]),
  ],
})
export class AuthModule {}
