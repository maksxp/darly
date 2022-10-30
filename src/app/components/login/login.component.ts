import { Component } from '@angular/core';
import { AuthenticationService } from "../../services/authentication.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  readonly EMAIL_PLACEHOLDER = 'email';
  readonly PASSWORD_PLACEHOLDER = 'password';
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly router: Router
  ) {}

  async onSignUp(email:string, password:string): Promise<void> {
    await this.authenticationService.signUp(email, password).then(() => {
      this.navigateToHomePageIfPossible();
    }).catch((error) => {
      alert(error.code);
    });
  }

  async onSignIn(email:string, password:string): Promise<void> {
    await this.authenticationService.signIn(email, password).then(() => {
      this.navigateToHomePageIfPossible();
    }).catch((error) => {
      alert(error.code);
    });
  }

  private navigateToHomePageIfPossible(): void {
    if(this.authenticationService.isLoggedIn) {
      this.router.navigate(['/home']);
    }
  }

}
