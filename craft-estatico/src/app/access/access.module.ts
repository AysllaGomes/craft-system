import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { LoginComponent } from './login/login.component';

import { SharedModule } from '../shared/shared.module';
import { TemplateModule } from '../template/template.module';
import { AccessRoutingModule } from './access-routing.module';

import { AccessService } from './service/access.service';
import { CredentialService } from './service/credential.service';
import { RequiresRoleGuard } from './service/guard/requires-role-guard.service';
import { RequiresLoginGuard } from './service/guard/requires-login-guard.service';
import { CredentialPermissionsService } from './service/credential-permissions.service';
import { NotRequiresLoginGuard } from './service/guard/not-requires-login-guard.service';

import { HttpExceptionInterceptor } from '../shared/interceptors/http-exception.interceptor';

@NgModule({
    imports: [CommonModule, SharedModule, TemplateModule, AccessRoutingModule, ReactiveFormsModule],

    declarations: [
        LoginComponent,
    ],

    providers: [
      AccessService,
      CredentialService,
      RequiresRoleGuard,
      RequiresLoginGuard,
      NotRequiresLoginGuard,
      CredentialPermissionsService,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: HttpExceptionInterceptor,
        multi: true
      }
    ]
})
export class AccessModule {}
