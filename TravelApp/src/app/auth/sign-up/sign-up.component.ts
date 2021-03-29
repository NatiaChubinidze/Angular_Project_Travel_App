import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUserInfo } from 'src/app/shared/interfaces/auth.interface';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  userInfo: IUserInfo = {
    email: 'eve.holt@reqres.in',
    password: 'pistol',
  };
  constructor(private router:Router, private authService:AuthService) { }

  ngOnInit(): void {
    if(localStorage.getItem("token")){
      this.router.navigate(['/home']);
    }
  }
   authorize(){
    this.authService
    .getRegisterToken(this.userInfo)
    .subscribe((signedUp: boolean) => {
      if (signedUp) {
        this.router.navigate(['/home']);
      }
    });
   }
}
