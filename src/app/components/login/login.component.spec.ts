import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { AuthenticationService } from "../../services/authentication.service";
import { Router } from "@angular/router";
import SpyObj = jasmine.SpyObj;

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: SpyObj<Router>;
  let authenticationService: jasmine.SpyObj<AuthenticationService>;
  const email = 'email';
  const password = 'password';
  const code = 'errorCode';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [
        {
          provide: AuthenticationService,
          useValue: jasmine.createSpyObj('BillingService', ['signIn', 'signUp'])
        },
        {
          provide: Router,
          useValue: jasmine.createSpyObj('Router', ['navigate'])
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router) as SpyObj<Router>;
    authenticationService = TestBed.inject(AuthenticationService) as SpyObj<AuthenticationService>;
    spyOn(window, 'alert');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onSignUp function', () => {
    it('should call signUp function of AuthenticationService and navigate to home on success', fakeAsync(() => {
      authenticationService.signUp.and.returnValue(Promise.resolve());
      authenticationService.isLoggedIn = true;
      component.onSignUp(email, password);
      tick();
      expect(authenticationService.signUp).toHaveBeenCalledWith(email, password);
      expect(router.navigate).toHaveBeenCalledWith(['/home']);
      expect(window.alert).not.toHaveBeenCalled();
    }));

    it('should call signUp function of AuthenticationService and show alert with error code', fakeAsync(() => {
      authenticationService.signUp.and.returnValue(Promise.reject({code}));
      component.onSignUp(email, password);
      tick();
      expect(authenticationService.signUp).toHaveBeenCalledWith(email, password);
      expect(router.navigate).not.toHaveBeenCalled();
      expect(window.alert).toHaveBeenCalledWith(code);
    }));
  });

  describe('onSignIn function', () => {
    it('should call signIn function of AuthenticationService and navigate to home on success', fakeAsync(() => {
      authenticationService.signIn.and.returnValue(Promise.resolve());
      authenticationService.isLoggedIn = true;
      component.onSignIn(email, password);
      tick();
      expect(authenticationService.signIn).toHaveBeenCalledWith(email, password);
      expect(router.navigate).toHaveBeenCalledWith(['/home']);
      expect(window.alert).not.toHaveBeenCalled();
    }));

    it('should call signIn function of AuthenticationService and show alert with error code', fakeAsync(() => {
      authenticationService.signIn.and.returnValue(Promise.reject({code}));
      component.onSignIn(email, password);
      tick();
      expect(authenticationService.signIn).toHaveBeenCalledWith(email, password);
      expect(router.navigate).not.toHaveBeenCalled();
      expect(window.alert).toHaveBeenCalledWith(code);
    }));
  });
});
