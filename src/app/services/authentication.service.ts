import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  isLoggedIn = false;

  constructor( public angularFireAuth: AngularFireAuth) { }

  async signIn(email: string, password : string): Promise<void> {
    await this.angularFireAuth.signInWithEmailAndPassword(email,password)
      .then( (response) => {
        this.isLoggedIn = true;
        localStorage.setItem('user',JSON.stringify(response.user));
      })
  }
  async signUp(email: string, password : string): Promise<void> {
    await this.angularFireAuth.createUserWithEmailAndPassword(email,password)
      .then( (response) => {
        this.isLoggedIn = true;
        localStorage.setItem('user',JSON.stringify(response.user));
      })
  }
  logout(): void {
    this.angularFireAuth.signOut();
    localStorage.removeItem('user');
  }
}
