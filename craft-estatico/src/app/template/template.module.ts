import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

import { PageNotFoundComponent } from './page/page-not-found/page-not-found.component';
import { PageAccessDeniedComponent } from './page/page-access-denied/page-access-denied.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
  ],
  declarations: [
    PageNotFoundComponent,
    PageAccessDeniedComponent,
  ],
  exports: [
    PageNotFoundComponent,
    PageAccessDeniedComponent
  ],
  providers: []
})
export class TemplateModule {}
