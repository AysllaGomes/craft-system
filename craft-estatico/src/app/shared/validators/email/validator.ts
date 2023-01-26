import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';

import { isPresent } from '../util/lang';

function isValidEmail(email: string): boolean {
    return pattern.test(email);
}

export const pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;

export const email: ValidatorFn = (control: AbstractControl): { [key: string]: boolean } => {
  if (
    isPresent(Validators.required(control))
  ) { return null; }

  const e: string = control.value;

  return isValidEmail(e) ? null : {'email': true};
}

