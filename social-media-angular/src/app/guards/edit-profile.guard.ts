import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class EditProfileGuard implements CanActivate {

  constructor(private authService : AuthService, private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let id : any = route.paramMap.get("pid");
    let giveAccess: boolean = false;
    if(this.authService.isLoggedIn && this.authService.currentUser.id == id){
      giveAccess = true;
    }else{
      giveAccess = false;
      this.router.navigate(["login"]);
    }
  return giveAccess;
  }
  
}
