import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {RouterModule} from '@angular/router';
import { HttpClientModule} from '@angular/common/http';

import { HomeComponent } from './home.component';
import { HeaderInterceptorService } from './add.header.interceptor.service';




@NgModule({
  declarations: [
  HomeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forChild([
      {
        path:'home',
        component:HomeComponent,
      },
      {
        path:'',
        redirectTo:'home',
        pathMatch:'full',
      }
    ])
  ],
  providers:[{
    provide:HTTP_INTERCEPTORS,
    useClass:HeaderInterceptorService,
    multi:true
  }],
  exports:[HomeComponent]
})
export class HomeModule { }
