import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthenticationService} from "../services/authentication.service";
import {loadSecondaryEntryPointInfoForApfV14} from "@angular/compiler-cli/ngcc/src/utils";
import {LOGIN_CONSTANTS} from "../constants/login.constants";

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(private readonly router: Router, private readonly authenticationService: AuthenticationService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
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

