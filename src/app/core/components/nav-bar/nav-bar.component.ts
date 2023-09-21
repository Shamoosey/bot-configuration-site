import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) { }

  get isAuthenticated(){ 
    return this.authService.isAuthenticated$;
  }

  ngOnInit() {
  }

  logout(){
    this.authService.logout({
      logoutParams: {
        returnTo: "http://localhost:4200"
      }
    });
  }
}
