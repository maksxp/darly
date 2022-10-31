import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import SpyObj = jasmine.SpyObj;
import firebase from "firebase/compat";
import UserCredential = firebase.auth.UserCredential;
import { LOGIN_CONSTANTS } from "../constants/login.constants";

describe('AuthenticationService', () => {
  let authenticationService: AuthenticationService;
  let angularFireAuth: jasmine.SpyObj<AngularFireAuth>;
  const email = 'email';
  const password = 'password';
  const uid = 'uid'

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthenticationService,
        {
          provide: AngularFireAuth,
          useValue: jasmine.createSpyObj('AngularFireAuth',
            ['signInWithEmailAndPassword', 'createUserWithEmailAndPassword', 'signOut'])
        }
      ]
    });
    authenticationService = TestBed.inject(AuthenticationService);
    angularFireAuth = TestBed.inject(AngularFireAuth) as SpyObj<AngularFireAuth>;
    authenticationService.isLoggedIn = false;
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'removeItem');
  });

  it('should be created', () => {
    expect(authenticationService).toBeTruthy();
  });

  it('should sign in',  fakeAsync(() => {
    angularFireAuth.signInWithEmailAndPassword.and.returnValue(Promise.resolve({ user: { uid } } as UserCredential));
    authenticationService.signIn(email, password);
    tick();
    expect(authenticationService.isLoggedIn).toBeTrue();
    expect(localStorage.setItem).toHaveBeenCalledWith(LOGIN_CONSTANTS.USER_UID, JSON.stringify(uid));
  }));

  it('should sign up',  fakeAsync(() => {
    angularFireAuth.createUserWithEmailAndPassword.and.returnValue(Promise.resolve({ user: { uid } } as UserCredential));
    authenticationService.signUp(email, password);
    tick();
    expect(authenticationService.isLoggedIn).toBeTrue();
    expect(localStorage.setItem).toHaveBeenCalledWith(LOGIN_CONSTANTS.USER_UID, JSON.stringify(uid));
  }));

  it('should logout',  fakeAsync(() => {
    angularFireAuth.signOut.and.returnValue(Promise.resolve());
    authenticationService.logout();
    tick();
    expect(angularFireAuth.signOut).toHaveBeenCalled();
    expect(localStorage.removeItem).toHaveBeenCalledWith(LOGIN_CONSTANTS.USER_UID);
  }));
});
