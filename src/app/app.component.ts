import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "./services/authentication.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'firebase-auth';
  isSignedIn = false;
  constructor(public firebaseService : AuthenticationService) {}

  ngOnInit(): void {
    this.isSignedIn = localStorage.getItem('user') !== null;
  }

  async onSignup(email:string, password:string): Promise<void> {
    await this.firebaseService.signUp(email,password)
    if(this.firebaseService.isLoggedIn)
      this.isSignedIn = true
  }

  async onSignIn(email:string, password:string): Promise<void>{
    await this.firebaseService.signIn(email,password)
    if(this.firebaseService.isLoggedIn)
      this.isSignedIn = true
  }

  handleLogout(): void {
    this.isSignedIn = false


  }

}
