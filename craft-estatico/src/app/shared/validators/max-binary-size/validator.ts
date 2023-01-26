import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';

import { isPresent } from '../util/lang';

/**
 *
 * @param {string | Blob} value
 * @param {number} maxSize
 * @param {string} metric
 * @returns {boolean}
 */
function isValid(value: string | Blob, maxSize: number, metric: string): boolean {
  if (!(value instanceof Blob)) {
    value = new Blob([value], {type: 'text/html'});
  }

  return value.size <= maxSize;
}

/**
 *
 * @param {number} maxSize
 * @param {string} metric
 * @returns {ValidatorFn}
 */
export function maxBinarySize(maxSize: number, metric: string = 'MB'): ValidatorFn {

  // @todo desenvolver componente de conversao de metricas ou utilizar um pacote para tal
  let metricValue = 1000000;

  if (metric === 'KB') {
    metricValue = 1000;
  }

  const maxSizeByte = maxSize * metricValue;

  return (control: AbstractControl) => {

    if (
      isPresent(Validators.required(control))
    ) { return null; }

    const v: string | Blob = control.value;

    return isValid(v, maxSizeByte, metric)
      ? null
      : {
          'maxBinarySize': {
              'max': maxSize,
              'metric': metric
          }
      };

  }

}
