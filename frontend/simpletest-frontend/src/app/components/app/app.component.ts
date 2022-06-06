import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'simpletest-frontend';
  hide = true;
  isUserLoggedIn: boolean = false;

  constructor(private authService: AuthService) {}

  public isLoggedIn(): boolean {
    console.log('Is authenticated? ' + this.authService.isAuthenticated());
    return this.authService.isAuthenticated();
  }

  ngOnInit() {
    this.isUserLoggedIn = this.authService.isAuthenticated();
  }

}
