import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { FireBaseAuthService } from '../auth/firebase-auth.service';
import { TOKEN_EXP_TIME, TRAVEL_APP_KEY, TRAVEL_TOKEN_EXP_KEY } from '../shared/constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  
  constructor(public authService: FireBaseAuthService, private router: Router, 
    private auth:AngularFireAuth) {}

  ngOnInit(): void {
    if (localStorage.getItem(TRAVEL_APP_KEY)) {
      setInterval(() => {
        if (!this.authService.tokenIsValid()) {
          if (this.authService.googleAuth && this.authService.userIsActive()) {
            
            firebase
              .auth()
              .currentUser.getIdToken(true)
              .then((token) => {
                localStorage.setItem(TRAVEL_APP_KEY, token);
                this.authService.setTokenValidTime();
              })
              .catch(() => {});
          } else {
            this.authService.signOut();
            this.router.navigate(['/login']);
          }
          if (TRAVEL_TOKEN_EXP_KEY) {
            localStorage.removeItem(TRAVEL_TOKEN_EXP_KEY);
          }
        }
      }, TOKEN_EXP_TIME);
    }
  }

  logOut() {
    console.log("sign out");
    console.log(this.auth.signOut());
    this.authService.signOut();
  }
}
