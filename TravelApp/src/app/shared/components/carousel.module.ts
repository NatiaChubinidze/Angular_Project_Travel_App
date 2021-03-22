import { NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {  CarouselComponent} from './carousel.component';

@NgModule({
  declarations: [CarouselComponent],
  imports: [BrowserModule, NgbModule],
  exports: [CarouselComponent],
  bootstrap: [CarouselComponent]
})
export class CarouselBasicModule{}  
