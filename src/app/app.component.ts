import { Component, OnInit } from '@angular/core';
import { AuthService } from './authentication/auth-service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  authenticated = false;

  constructor(
    private authService: AuthService
  ){}

  ngOnInit(){
    this.authService.isAuthenticatedSubject.subscribe((authenticated: boolean) => {
      this.authenticated = authenticated;
    })
  }
}
