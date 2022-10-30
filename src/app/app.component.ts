import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "./services/authentication.service";
import {Router} from "@angular/router";
import {LOGIN_CONSTANTS} from "./constants/login.constants";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // isSignedIn = false;
  // constructor(private readonly authenticationService : AuthenticationService, private readonly router: Router) {}

  // ngOnInit(): void {
  //   this.isSignedIn = localStorage.getItem(LOGIN_CONSTANTS.USER_UID) !== null;
  // }

  // async onSignUp(email:string, password:string): Promise<void> {
  //   await this.authenticationService.signUp(email, password)
  //   if(this.authenticationService.isLoggedIn) {
  //     this.isSignedIn = true;
  //   }
  // }
  //
  // async onSignIn(email:string, password:string): Promise<void>{
  //  await this.authenticationService.signIn(email, password).then(() => {
  //     if(this.authenticationService.isLoggedIn) {
  //       this.isSignedIn = true
  //       this.router.navigate(['/home']);
  //     }
  //   })
  // }

  // handleLogout(): void {
  //   this.isSignedIn = false
  // }
}
