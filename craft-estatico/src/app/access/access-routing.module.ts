import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { PageBlankComponent } from '../template/page/page-blank/page-blank.component';

import { NotRequiresLoginGuard } from './service/guard/not-requires-login-guard.service';


const routes: Routes = [
  {
    path: '',
    component: PageBlankComponent,
    children: [
      {
        path: '',
        component: LoginComponent,
        canActivate: [NotRequiresLoginGuard]
      },
    ],
  },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class AccessRoutingModule {}
