import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './template/page/page-not-found/page-not-found.component';
import { PageAccessDeniedComponent } from './template/page/page-access-denied/page-access-denied.component';

const routes: Routes = [
  {
    path: 'acesso/negado',
    component: PageAccessDeniedComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
