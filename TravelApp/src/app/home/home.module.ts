import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import { HttpClientModule} from '@angular/common/http';

import { HomeComponent } from './home.component';





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
})
export class HomeModule { }
