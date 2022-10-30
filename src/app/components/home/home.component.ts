import { Component } from '@angular/core';
import { AuthenticationService } from "../../services/authentication.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(
    public authenticationService: AuthenticationService,
    private readonly router: Router
  ) {}

  logout(): void {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
