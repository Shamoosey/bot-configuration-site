import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { AuthService } from 'src/app/authentication/auth-service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(
    private auth: Auth,
  ) { }

  ngOnInit(): void {
  }

  logout(){
    this.auth.signOut();
  }
}
