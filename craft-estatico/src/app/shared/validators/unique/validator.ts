import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';

import { isPresent } from '../util/lang';

/**
 * Verifica a unicidade com base nos proprios valores
 * ou com base em um array ou outro Elemento de Formulário (AbstractControl)
 */
// @ts-ignore
export function unique(listControl: AbstractControl | Array<any> = null): ValidatorFn {

  return (control: AbstractControl): { [key: string]: boolean } | null => {
    let list: Array<any>;

    if (
      isPresent(Validators.required(control))
    ) { return null; }

    // se tiver uma lista de comparação
    if (listControl) {

      list = listControl instanceof AbstractControl
        ? [...listControl.value]
        : [...listControl];

      list = list.length ? list : [];

      list.push(control.value);

    } else {
      // se tiver que verificar com base nos próprios itens
      list = control.value;
    }

    const repeatedItems = list.filter((elem, pos, arr) => {
      const verifyIndex = arr.indexOf(elem);
      return verifyIndex !== pos && verifyIndex !== -1;
    });

    return repeatedItems.length > 0 ? {'unique': true} : null;
  }

}
