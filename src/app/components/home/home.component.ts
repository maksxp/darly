import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    public authenticationService: AuthenticationService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    console.log('INIT');
  }

  logout(): void {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}
