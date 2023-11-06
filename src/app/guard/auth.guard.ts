import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { BackoffService } from '../backoff.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(private service: BackoffService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.service.isLogged().pipe(map(isLogged => {
      if (isLogged) {
        console.log("Is logged")
        return true
      } else {
        console.log("Is Not logged")
        return this.router.parseUrl("login");
      }

    }));
  }

}