import { Injectable } from '@angular/core';

import { AccessService } from './access.service';

@Injectable()
export class CredentialPermissionsService {

  constructor(
    public accessService: AccessService
  ) {}

}
