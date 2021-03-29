import { Component, OnInit } from '@angular/core';
import { IUserInfo } from 'src/app/shared/interfaces/auth.interface';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service'
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  userInfo: IUserInfo = {
    email: 'eve.holt@reqres.in',
    password: 'cityslicka',
  };
  constructor(private router:Router, private authService:AuthService) { }

  ngOnInit(): void {
    if(localStorage.getItem("token")){
      this.router.navigate(['/home']);
    }
  }

  authorize(){
    this.authService
      .getLoginToken(this.userInfo)
      .subscribe((signedIn: boolean) => {
        if (signedIn) {
          this.router.navigate(['/home']);
        }
      });
  }

 

}
