import { Component, OnInit } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { getAuth } from 'firebase/auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-configuration',
  templateUrl: './edit-configuration.component.html',
  styleUrls: ['./edit-configuration.component.scss']
})
export class EditConfigurationComponenet implements OnInit {

  constructor(
    private fireStore: Firestore
  ) { }

  ngOnInit(): void {

    
    // this doesn't work since i still need to setup the firestore rules in the console
    // const userProfileCollection = collection(this.fireStore, '/StatusMessages');
    // const data = collectionData(userProfileCollection) as Observable<[]>;
    // data.subscribe((x) => {
    //   console.log(x)
    // })
  }

}
