import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';

import { isPresent } from '../util/lang';

/**
 *
 * @param {File} file
 * @param {string[]} formatList
 * @returns {boolean}
 */
function isValid(file: File, formatList: string[]): boolean {
    // deixa o format em caixa alta para comparar com a lista de formatos validos (tambem em caixa alta)
    // @ts-ignore
  let format = file.name.split('.').pop().toUpperCase();

    return formatList.includes(format);
}

/**
 *
 * @param {string[]} formatList
 * @returns {ValidatorFn}
 */
export function fileFormat(formatList: string[]): ValidatorFn {

  // deixa os formatos em caixa alta para validar com a extensão (tambem em caixa alta)
  formatList = formatList.map(format => format.toUpperCase());

  return (control: AbstractControl): { [key: string]: any } | null=> {
    if (
      isPresent(Validators.required(control))
    ) { return null; }

    const v: File = control.value;

    return isValid(v, formatList)
      ? null
      : {
        'fileFormat': {
          'formatList': formatList
        }
      };

  }

}
