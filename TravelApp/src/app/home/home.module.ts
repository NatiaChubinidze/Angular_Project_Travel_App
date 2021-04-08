import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { HomeComponent } from './home.component';
import {HttpCacheInterceptorService} from '../core/cache.interceptor';
import { HomeGuard } from './home.guard';



@NgModule({
  declarations: [
  HomeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path:'home',
        component:HomeComponent,
        canActivate:[HomeGuard]
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
