import { Injectable } from "@angular/core";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { BehaviorSubject, Observable, ReplaySubject, Subject } from "rxjs";
import { UserState } from "../models/user-state";
import { Auth, browserLocalPersistence } from "@angular/fire/auth";
import { ActivatedRoute, Router } from "@angular/router";
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public userBehaviorSubject:Subject<UserState> = new ReplaySubject<UserState>(1);
  public isAuthenticatedSubject:Subject<boolean> = new ReplaySubject<boolean>(1);

  constructor (
    private auth: Auth,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.isAuthenticatedSubject.next(true)

    //Commenting out, maybe will use my own auth
    // auth.setPersistence(browserLocalPersistence);
    // auth.onAuthStateChanged((user: User | null) => {
    //   if (user) {
    //     this.userBehaviorSubject.next(new UserState(user))
    //     this.isAuthenticatedSubject.next(true)
    //   }
    //   else {
    //     this.userBehaviorSubject.next(new UserState(null))
    //     this.isAuthenticatedSubject.next(false)
    //     this.router.navigate(['login']);
    //   }
    // });
  }
}

