import { TestBed } from '@angular/core/testing';

import { LoginGuard } from './login.guard';
import { AuthenticationService} from "../services/authentication.service";
import { ActivatedRouteSnapshot, Router } from "@angular/router";
import SpyObj = jasmine.SpyObj;

describe('LoginGuard', () => {
  let guard: LoginGuard;
  let router: SpyObj<Router>;
  let authenticationService: jasmine.SpyObj<AuthenticationService>;
  const snapshot = {} as ActivatedRouteSnapshot;
  snapshot.queryParams = { path: '/home' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoginGuard,
        {
          provide: AuthenticationService,
          useValue: jasmine.createSpyObj('AuthenticationService', ['signIn', 'signUp', 'logout'])
        },
        {
          provide: Router,
          useValue: jasmine.createSpyObj('Router', ['navigate'])
        }
      ]
    });
    guard = TestBed.inject(LoginGuard);
    router = TestBed.inject(Router) as SpyObj<Router>;
    authenticationService = TestBed.inject(AuthenticationService) as SpyObj<AuthenticationService>;
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  describe('canActivate function', () => {
    it('should redirect to login page', () => {
      authenticationService.isLoggedIn = false;
      spyOn(localStorage, 'getItem').and.returnValue(null);
      guard.canActivate(snapshot).catch(() => {});
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
    });

    it('should not redirect to login page if user is logged in', () => {
      authenticationService.isLoggedIn = true;
      spyOn(localStorage, 'getItem').and.returnValue(null);
      guard.canActivate(snapshot).then(() => {});
      expect(router.navigate).not.toHaveBeenCalled();
    });

    it('should not redirect to login page if user is in localStorage', () => {
      authenticationService.isLoggedIn = false;
      spyOn(localStorage, 'getItem').and.returnValue('ID');
      guard.canActivate(snapshot).then(() => {});
      expect(router.navigate).not.toHaveBeenCalled();
    });
  })
});
