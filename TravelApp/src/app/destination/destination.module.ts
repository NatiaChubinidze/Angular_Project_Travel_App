import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';

import { LandmarksComponent } from '../destination/landmarks.component';
import { TransportComponent } from '../destination/transport.component';
import { HotelComponent } from '../destination/hotel.component';
import { DestinationComponent } from './destination.component';
import {HtmldecoderPipe} from '../shared/html-decoder.pipe';
import {capitalize} from '../shared/capitalize.pipe';

@NgModule({
  declarations: [

    LandmarksComponent,
    TransportComponent,
    HotelComponent,
    DestinationComponent,
    HtmldecoderPipe,
    capitalize
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path:'destination/:query/:checkIn/:checkOut/:adults1',
        component:DestinationComponent,
      },
     
      // {
      //   path:'landmarks/:query',
      //   component:LandmarksComponent,
      // },
      // {
      //   path:'transport/:query',
      //   component:TransportComponent,
      // },
      // {
      //   path:'hotels/:destinationId/:checkIn/:checkOut/:adults1',
      //   component:HotelComponent,
      // },
    ])
  ]
})
export class DestinationModule { }
