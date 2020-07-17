import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { User } from 'firebase';
import { User as UserInfo } from '../../src/app/models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;
  loginError: null;

  constructor(public afAuth: AngularFireAuth, public router: Router) {
    this.afAuth.authState.subscribe(user => {
      console.log('userSubscribe', user);
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    });

  }

  async login(userInfo: UserInfo) {
    var result = await this.afAuth.signInWithEmailAndPassword(userInfo.email, userInfo.password)
      .catch(function (error) {
        console.log(error);
        throw new TypeError(error);
      });

    this.router.navigate(['dashboard']);
  }

  logout() {
    this.afAuth.signOut();
    this.router.navigate(['login']);
  }
}

