import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private readonly authenticationService : AuthenticationService, private readonly router: Router) {}

  async onSignUp(email:string, password:string): Promise<void> {
    await this.authenticationService.signUp(email, password).then(() => {
      this.navigateToHomePageIfPossible();
    });
  }

  async onSignIn(email:string, password:string): Promise<void> {
    await this.authenticationService.signIn(email, password).then(() => {
      this.navigateToHomePageIfPossible();
    });
  }

  private navigateToHomePageIfPossible(): void {
    if(this.authenticationService.isLoggedIn) {
      this.router.navigate(['/home']);
    }
  }

}
