import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
  ) {
    if (this.authenticationService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  get loginFormControl() { return this.loginForm.controls; }

  public onLogin() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.authenticationService
    .login(this.loginFormControl.username.value, this.loginFormControl.password.value)
      .then(this.handleSuccess)
      .catch(this.handleError);
  }

  public onLogout() {
    this.authenticationService.logout();
  }

  private handleSuccess() {
    console.log("Login Successfully");
    location.reload();
  }

  private handleError(error: any) {
    console.log(error);
  }

  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }
}
