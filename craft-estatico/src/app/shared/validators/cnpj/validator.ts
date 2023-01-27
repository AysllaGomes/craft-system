import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';

import { isPresent } from '../util/lang';

/**
 * @see http://www.geradorcnpj.com/javascript-validar-cnpj.htm
 */
function isValidCNPJ(cnpj: string): boolean {

    let tamanho;
    let numeros;
    let digitos;
    let soma;
    let pos;
    let resultado;

    cnpj = cnpj.replace(/[^\d]+/g, '');

    if (cnpj == '') {
        return false;
    }

    if (cnpj.length != 14) {
        return false;
    }

    // Elimina CNPJs invalidos conhecidos
    if (
      cnpj == "00000000000000"
      || cnpj == "11111111111111"
      || cnpj == "22222222222222"
      || cnpj == "33333333333333"
      || cnpj == "44444444444444"
      || cnpj == "55555555555555"
      || cnpj == "66666666666666"
      || cnpj == "77777777777777"
      || cnpj == "88888888888888"
      || cnpj == "99999999999999"
    ) { return false; }

    // Valida DVs
    tamanho = cnpj.length - 2;
    numeros = cnpj.substring(0, tamanho);
    digitos = cnpj.substring(tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      // @ts-ignore
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) {
            pos = 9;
        }
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  // @ts-ignore
    if (resultado != digitos.charAt(0)) {
        return false;
    }
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      // @ts-ignore
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) {
            pos = 9;
        }
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;

    // @ts-ignore
  return resultado == digitos.charAt(1);
}

export const cnpj: ValidatorFn = (control: AbstractControl): { [key: string]: boolean } | null => {
  if (
    isPresent(Validators.required(control))
  ) { return null; }

  let value: string = control.value;

  value = value.replace(/[^\d]+/g, '');

  if (value.length == 14) {
    return isValidCNPJ(value) ? null : {'cnpj': true}
  }

  return null;
}
