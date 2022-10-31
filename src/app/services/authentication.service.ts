import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { LOGIN_CONSTANTS } from "../constants/login.constants";

@Injectable()
export class AuthenticationService {
  private _isLoggedIn = false;

  get isLoggedIn(): boolean {
    return this._isLoggedIn;
  }

  set isLoggedIn(isLoggedIn: boolean) {
    this._isLoggedIn = isLoggedIn;
  }

  constructor(private readonly angularFireAuth: AngularFireAuth) {}

  async signIn(email: string, password : string): Promise<void> {
    await this.angularFireAuth.signInWithEmailAndPassword(email,password)
      .then( (response) => {
        this.isLoggedIn = true;
        localStorage.setItem(LOGIN_CONSTANTS.USER_UID, JSON.stringify(response.user?.uid));
      })
  }

  async signUp(email: string, password : string): Promise<void> {
    await this.angularFireAuth.createUserWithEmailAndPassword(email,password)
      .then( (response) => {
        this.isLoggedIn = true;
        localStorage.setItem(LOGIN_CONSTANTS.USER_UID, JSON.stringify(response.user?.uid));
      })
  }
  logout(): void {
    this.angularFireAuth.signOut().finally();
    localStorage.removeItem(LOGIN_CONSTANTS.USER_UID);
  }
}
