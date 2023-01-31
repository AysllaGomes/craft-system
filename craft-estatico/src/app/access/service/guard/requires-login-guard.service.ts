import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { AccessService } from '../access.service';

@Injectable()
export class RequiresLoginGuard implements CanActivate {

  constructor(
    private accessService: AccessService, private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (
      this.accessService.isLogged()
    ) { return true; }

    this.router.navigate(['acesso/negado']);

    return false;
  }

}
