import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import {RouterModule} from '@angular/router';
import {NgxPaginationModule} from 'ngx-pagination';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { LandmarksComponent } from './landmarks/landmarks.component';
import { TransportComponent } from './transport/transport.component';
import { HotelComponent } from './hotels/hotel.component';

import {HtmldecoderPipe} from '../shared/pipes/html-decoder.pipe';
import {capitalize} from '../shared/pipes/capitalize.pipe';
import { HeaderInterceptorService } from '../shared/services/add.header.interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HotelDetailsComponent } from './hotels/hotel-details/hotel-details.component';
import {HttpCacheInterceptorService} from '../core/cache.interceptor';
import {CarouselBasicModule} from '../shared/components/carousel/carousel.module';
import { DestinationResolverService } from './destination-resolver.service';
import { HotelsLandmarksResolverService } from './hotels-landmarks-resolver.service';
import { AuthGuard } from '../auth/auth.guard';


@NgModule({
  declarations: [
    
    LandmarksComponent,
    TransportComponent,
    HotelComponent,
    
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
        path:'hotels/hotel-details/:hotelId',
        component:HotelDetailsComponent,
        canActivate:[AuthGuard]
      },
      {
        path:'landmarks',
        component:LandmarksComponent,
        resolve:{
          landmarksData:HotelsLandmarksResolverService
        },
        canActivate:[AuthGuard]
      },
      {
        path:'hotels',
        component:HotelComponent,
        resolve:{
          hotelsData:HotelsLandmarksResolverService
        },
        canActivate:[AuthGuard]
      },
      {
        path:'transport',
        component:TransportComponent,
        resolve:{
          destinationResponse:DestinationResolverService
        },
        canActivate:[AuthGuard]
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
