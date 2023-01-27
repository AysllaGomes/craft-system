import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';

import { isPresent } from '../util/lang';

/**
 * Verifica se existe no mínimo 1 checkbox marcado em um array de checkbox.
 */
// @ts-ignore
export function checkboxRequired(listControl: AbstractControl | Array<any> = null): ValidatorFn {

  return (control: AbstractControl): { [key: string]: boolean } | null => {
    if (
      isPresent(Validators.required(control))
    ) { return null; }

    // @ts-ignore
    let hasChecked = control.value.some(item => item.checked);

    return !hasChecked ? {'checkboxRequired': true} : null;
  }

}
