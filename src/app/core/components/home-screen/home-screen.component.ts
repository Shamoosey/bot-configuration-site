import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.scss']
})
export class HomeScreenComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  get isAuthenticated(){ 
    return this.authService.isAuthenticated$;
  }

  ngOnInit() {
    if(this.isAuthenticated){
      this.router.navigate(["configuration"])
    }
  }
}
