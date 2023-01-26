import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TruncatePipe } from './pipe/truncate.pipe';
import { SafeHtmlPipe } from './pipe/safe-html.pipe';
import { PlainTextPipe } from './pipe/plain-text.pipe';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  providers: [
    SafeHtmlPipe,
    TruncatePipe,
    PlainTextPipe,
  ],
  declarations: [
    SafeHtmlPipe,
    TruncatePipe,
    PlainTextPipe
  ],
  exports: [ ]
})
export class SharedModule { }
