import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UsersDataService } from './../users-data.service';
import { User } from '../user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  message!:string;
  err!:string;

  registerForm!: FormGroup;

  constructor(private authenticationService:AuthenticationService,
              private formBuilder:FormBuilder,
              private usersDataService:UsersDataService
    ) { }

  ngOnInit(): void {

    this.registerForm = this.formBuilder.group({
      name:['',Validators.required],
      username:['',Validators.required],
      password:['',Validators.required],
      passwordRepeat:['',Validators.required]
    })
  }

  onRegister() : void {
    let newUser:User = this.registerForm.value;
    this.usersDataService.register(newUser)
       .then((response)=>this.handleSuccess(response))
       .catch((error)=>this.handleError(error));
  }

  private handleSuccess(response:any) {
    console.log(response);
    this.message = "Successful registration, please login";
    this.registerForm.reset();
  }
  private handleError(error:any) {
    console.log(error);
    this.err = "username or password is incorrect";
  }
  isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }
}
