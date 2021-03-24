import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { TOKEN_EXP_TIME, TRAVEL_TOKEN_EXP_KEY } from '../shared/constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  logOutVisibility: boolean;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    setInterval(() => {
      this.logOutVisibility = this.authService.isSignedIn();
    }, 1000);
    setInterval(() => {
      if (!this.authService.tokenIsValid()) {
        this.authService.signOut();
        localStorage.removeItem(TRAVEL_TOKEN_EXP_KEY);
        this.router.navigate(['/signIn']);
      }
    }, TOKEN_EXP_TIME);
  }
  logOut() {
    this.authService.signOut();
    this.router.navigate(['/signIn']);
  }
}
