import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { AuthenticationService } from "../../services/authentication.service";
import { Router } from "@angular/router";
import SpyObj = jasmine.SpyObj;

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let router: SpyObj<Router>;
  let authenticationService: SpyObj<AuthenticationService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      providers: [
        {
          provide: AuthenticationService,
          useValue: jasmine.createSpyObj('BillingService', ['signIn', 'signUp', 'logout'])
        },
        {
          provide: Router,
          useValue: jasmine.createSpyObj('Router', ['navigate'])
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router) as SpyObj<Router>;
    authenticationService = TestBed.inject(AuthenticationService) as SpyObj<AuthenticationService>;
    router.navigate.and.returnValue(new Promise<boolean>(() => {}));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('logout function', () => {
    it('should call authenticationService\'s logout function and navigate to login page ', () => {
      component.logout();
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
      expect(authenticationService.logout).toHaveBeenCalled();
    });
  })
});
