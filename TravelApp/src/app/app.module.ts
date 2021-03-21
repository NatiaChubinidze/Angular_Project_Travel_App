import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule} from '@angular/router';

import { HomeModule } from './home/home.module';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthModule } from './auth/auth.module';

import { DestinationModule } from './destination/destination.module';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    HomeModule,
    AuthModule,
    DestinationModule,
    RouterModule.forRoot([
      {
        path: '**',
        component: PageNotFoundComponent,
      },
    ]),
    DestinationModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
