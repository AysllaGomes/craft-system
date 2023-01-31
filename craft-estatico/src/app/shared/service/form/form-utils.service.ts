import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

import * as moment from 'moment';

import { FormMessageService } from './form-message.service';

@Injectable()
export class FormUtilsService {

  protected _when: string[] = ['dirty', 'touched'];

  constructor(
    protected formMessageService: FormMessageService
  ) {}

  get when(): string[] {
    return this._when;
  }

  /**
   * Verifica se ocorreu alguma alteração no formulário
   *
   * @param {FormGroup} form
   * @param {any} formEmptyValues
   */
  hasChanges(form: FormGroup, formEmptyValues: any): boolean {
    if (form) {
      const formDataDefault = Object.assign({}, formEmptyValues);
      const formData = Object.assign({}, form.value);

      return JSON.stringify(formDataDefault, this.replacerEmptyNull) !== JSON.stringify(formData, this.replacerEmptyNull);
    }

    return false;
  }

  replacerEmptyNull(key: any, value: any): any {
    value = value === '' || value === undefined ? null : value;
    return value;
  }

  /**
   * Aplica validação no formulário
   *
   * @param formGroup
   */
  validate(formGroup: FormGroup): boolean {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      // @ts-ignore
      control.markAsDirty();

      if (control instanceof FormGroup) {
        this.validate(control);
      }
    });

    return formGroup.valid;
  }

  showValidationMessage(control: AbstractControl) {
    let verifyStatus: boolean;

    for (let status of this.when) {
      // @ts-ignore
      verifyStatus = verifyStatus || control[status];
    }

    // @ts-ignore
    return control.invalid && (verifyStatus);
  }

  /**
   * Retorna o texto relativo a mensagem de validação do campo
   *
   * @param {AbstractControl} control
   * @param {string} messageName
   * @returns {string}
   */
  getMessage(control: AbstractControl, messageName: string): string {
    // @ts-ignore
    const messageCallback = this.formMessageService[messageName];

    return messageCallback
      ? messageCallback(control)
      : this.formMessageService.messageNotFound;
  }

  convertStringToDate(string: any) {
    return string ? moment(string).toDate() : null;
  }

  prepareError(error: string | string[], summary = 'Atenção: ') {

    const message = Array.isArray(error)
      ? error.join('|')
      : error;

    return [{
      severity: 'error',
      summary: summary,
      detail: message
    }];
  }

}
