import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IUserInfo } from 'src/app/shared/interfaces/auth.interface';
import { FireBaseAuthService } from '../firebase-auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  userInfo: IUserInfo = {
    email: '',
    password: '',
  };
  email: FormControl;
  password: FormControl;
  authForm: FormGroup;
  buttonHover: boolean = false;

  constructor(public fireBaseAuthService: FireBaseAuthService) {
    this.email = new FormControl(
      '',
      Validators.compose([
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ])
    );
    this.password = new FormControl(
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20),
        Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{5,}'
        ),
      ])
    );
    this.authForm = new FormGroup({
      email: this.email,
      password: this.password,
    });
  }

  emailIsInvalid(): boolean {
    return this.email.invalid && (this.email.touched || this.buttonHover);
  }
  passwordIsInvalid(): boolean {
    return this.password.invalid && (this.password.touched || this.buttonHover);
  }
  ngOnInit(): void {}

  googleLogin() {
    this.fireBaseAuthService.signInGoogle();
  }

  logInWithEmail() {
    this.userInfo = this.authForm.value as IUserInfo;
    this.fireBaseAuthService.signInEmail(this.userInfo);
  }
  githubSignin() {
    this.fireBaseAuthService.signInGithub();
  }
  facebookSignin() {
    this.fireBaseAuthService.signInFacebook();
  }
}
