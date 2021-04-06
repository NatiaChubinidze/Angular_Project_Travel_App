import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';
import { RouterModule } from '@angular/router';

import { HomeModule } from './home/home.module';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthModule } from './auth/auth.module';
import { DestinationModule } from './destination/destination.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent, FooterComponent, HeaderComponent],
  imports: [
    BrowserModule,
    HomeModule,
    AuthModule,
    DestinationModule,
    NgxAuthFirebaseUIModule.forRoot({
      apiKey: 'AIzaSyDyZ9CJESc_3iMu_tucQnoy4eu7uH3zfNg',
      authDomain: 'travelapp-437f8.firebaseapp.com',
      databaseURL:
        'https://console.firebase.google.com/project/travelapp-437f8/firestore/data~2F',
      projectId: 'travelapp-437f8',
      storageBucket: 'travelapp-437f8.appspot.com',
      messagingSenderId: '814244893519',
    }),
    RouterModule.forRoot([
      {
        path: '**',
        component: PageNotFoundComponent,
      },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
