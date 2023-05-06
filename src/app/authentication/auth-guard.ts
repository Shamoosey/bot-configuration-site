import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthService } from "./auth-service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor (
    private authService: AuthService,
  ) {
    this.authService.userBehaviorSubject.subscribe((user) => {
      console.log(user)
    })
    this.authService.isAuthenticatedSubject.subscribe((auth) => {
      console.log(auth)
    })
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.authService.isAuthenticatedSubject.asObservable();
  }
}