import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpHeaderInterceptor } from './add-header.interceptor';
import { CommonModule } from '@angular/common';

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
    {
      path:'',
      redirectTo:'signIn',
      pathMatch:'full',
    }
    ]),
  ],
  providers:[
    { provide:HTTP_INTERCEPTORS,
      useClass:HttpHeaderInterceptor,
      multi:true
    },
  ],
})
export class AuthModule {}
