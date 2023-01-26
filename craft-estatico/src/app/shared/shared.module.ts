import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TruncatePipe } from './pipe/truncate.pipe';
import { SafeHtmlPipe } from './pipe/safe-html.pipe';
import { PlainTextPipe } from './pipe/plain-text.pipe';
import { OnlyNumbersDirective } from './directive/only-numbers.directive';

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
    PlainTextPipe,
    OnlyNumbersDirective
  ],
  exports: [
    OnlyNumbersDirective
  ]
})
export class SharedModule { }
