import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import {RouterModule} from '@angular/router';
import {NgxPaginationModule} from 'ngx-pagination';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { LandmarksComponent } from './landmarks/landmarks.component';
import { TransportComponent } from './transport/transport.component';
import { HotelComponent } from './hotels/hotel.component';
import { DestinationComponent } from './destination-background/destination.component';
import {HtmldecoderPipe} from '../shared/pipes/html-decoder.pipe';
import {capitalize} from '../shared/pipes/capitalize.pipe';
import { HeaderInterceptorService } from '../shared/services/add.header.interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HotelDetailsComponent } from './hotels/hotel-details/hotel-details.component';
import {HttpCacheInterceptorService} from '../core/cache.interceptor';
import {CarouselBasicModule} from '../shared/components/carousel/carousel.module';


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
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
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
