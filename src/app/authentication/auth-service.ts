import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, ReplaySubject, Subject } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { UserState } from "../shared/models/user-state";
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public userBehaviorSubject:Subject<UserState> = new ReplaySubject<UserState>(1);
  public isAuthenticatedSubject:Subject<boolean> = new ReplaySubject<boolean>(1);

  constructor (
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

