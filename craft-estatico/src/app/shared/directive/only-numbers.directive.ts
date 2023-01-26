import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: 'input[appOnlyNumbers]'
})
export class OnlyNumbersDirective {

  // Allow decimal numbers and negative values
  private regex: RegExp = new RegExp(/[^0-9]$/g);
  // Allow key codes for special events. Reflect :
  // Backspace, tab, end, home
  private specialKeys: Array<string> = ['Backspace', 'Delete', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight'];

  constructor(protected elementRef: ElementRef) {}

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const current: string = this.elementRef.nativeElement.value;
    const next: string = current.concat(event.key);

    if (this.specialKeys.indexOf(event.key) !== -1) { return; }

    if (
      next
      && String(next).match(this.regex)
    ) { event.preventDefault(); }
  }

}
