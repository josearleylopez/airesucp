import { Injectable } from '@angular/core';
import { Router,
        ActivatedRouteSnapshot,
        RouterStateSnapshot,
        CanActivate } from '@angular/router';
import { LoginService } from './login.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private _loginService: LoginService) { }

  canActivate(next:ActivatedRouteSnapshot,state:RouterStateSnapshot){
    // return true;
    if (this._loginService.getUsuarioStorage()) {
          return true;
    }else{
      return false;
    }
  }

}
