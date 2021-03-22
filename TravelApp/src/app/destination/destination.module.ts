import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import {RouterModule} from '@angular/router';

import { LandmarksComponent } from '../destination/landmarks.component';
import { TransportComponent } from '../destination/transport.component';
import { HotelComponent } from '../destination/hotel.component';
import { DestinationComponent } from './destination.component';
import {HtmldecoderPipe} from '../shared/pipes/html-decoder.pipe';
import {capitalize} from '../shared/pipes/capitalize.pipe';
import { HeaderInterceptorService } from '../shared/services/add.header.interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HotelDetailsComponent } from './hotel-details/hotel-details.component';
import {HttpCacheInterceptorService} from '../core/cache.interceptor';
import {CarouselBasicModule} from '../shared/components/carousel.module';

@NgModule({
  declarations: [

    LandmarksComponent,
    TransportComponent,
    HotelComponent,
    DestinationComponent,
    HotelDetailsComponent,
    HtmldecoderPipe,
    capitalize
  ],
  imports: [
    CommonModule,
    CarouselBasicModule,
    RouterModule.forChild([
      {
        path:'destination/:query/:checkIn/:checkOut/:adults1/hotel-details/:hotelId',
        component:HotelDetailsComponent,
      },
      {
        path:'destination/:query/:checkIn/:checkOut/:adults1',
        component:DestinationComponent,
      },
    ])
  ],
  providers:[{
    provide:HTTP_INTERCEPTORS,
    useClass:HeaderInterceptorService,
    multi:true
  },
  {
    provide:HTTP_INTERCEPTORS,
    useClass:HttpCacheInterceptorService,
    multi:true
  },DatePipe
]
})
export class DestinationModule { }
