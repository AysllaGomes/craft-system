import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { AccessService } from '../access.service';

@Injectable()
export class NotRequiresLoginGuard implements CanActivate {

  constructor(
    protected accessService: AccessService, protected router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot
  ) {
    if (
      !this.accessService.isLogged()
    ) { return true; }

    this.router.navigate(['/home']);

    return false;
  }

}
