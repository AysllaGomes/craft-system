import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { AccessService } from '../access.service';

@Injectable()
export class RequiresRoleGuard implements CanActivate {

  constructor(
    protected router: Router,
    protected accessService: AccessService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (
      this.accessService.isLogged()
    ) {
      let hasRole = this.accessService.hasRole(route.data['roleList']);

      if (hasRole) { return true; }
    }

    this.router.navigate(['acesso/negado']);

    return false;
  }

}
