import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthenticationService} from "../services/authentication.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

@Output() isLogout = new EventEmitter<void>()
  constructor(public firebaseService: AuthenticationService) { }

  ngOnInit(): void {
  }
  logout(): void {
    this.firebaseService.logout()
    this.isLogout.emit()
  }

}
