import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthenticationService } from "../services/authentication.service";
import { LOGIN_CONSTANTS } from "../constants/login.constants";

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(private readonly router: Router, private readonly authenticationService: AuthenticationService) {}

  canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (!this.authenticationService.isLoggedIn && !localStorage.getItem(LOGIN_CONSTANTS.USER_UID)) {
        this.router.navigate(['/login']);
        reject();
      } else {
        resolve(true);
      }
    });
  }
}

