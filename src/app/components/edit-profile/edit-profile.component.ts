import { Component, OnInit } from '@angular/core';
import { getAuth } from 'firebase/auth';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  signOut(){
    const auth = getAuth();
    auth.signOut();
  }
}
