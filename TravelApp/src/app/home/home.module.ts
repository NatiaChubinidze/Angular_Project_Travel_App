import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { HomeComponent } from './home.component';
import {HttpCacheInterceptorService} from '../core/cache.interceptor';





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
  providers:[
    {provide:HTTP_INTERCEPTORS,
      useClass:HttpCacheInterceptorService,
      multi:true}
  ]
})
export class HomeModule { }
