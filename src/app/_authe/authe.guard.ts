import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../_share/services/authentication.services';


@Injectable({
  providedIn: 'root'
})
export class AutheGuard implements CanActivate {
  constructor(
    private router:Router,
    private authenticationService:AuthenticationService
  ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const user = this.authenticationService.userValue;
     
      if (user.flag) {
          // logged in so return true
          return true;
      } else {
          // not logged in so redirect to login page with the return url
          console.log('vao day')
          this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
          return false;
      }
  }
  
}
