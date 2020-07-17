import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase/app";
import { AuthService } from "../../../service/auth/auth.service"

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";
import { FormBuilder } from "@angular/forms";
import { User } from "../models/User";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  step1Show = true;
  step2Show = false;
  loginForm: FormGroup;
  errorMessage: '';
  user: User = {
    email: '',
    password: ''
  }


  constructor(public authService: AuthService, private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: "",
      password: ""
    });
  }

  ngOnInit(): void {
  }

  async onSubmit() {
    try {
      const result = await this.authService.login(this.user);
    } catch (error) {
      this.errorMessage = error.message;
    }
  }
}
