import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { sprintf } from 'sprintf-js';

import { FormMessage } from './form-message-lang/form-message';
import { FormMessagePt } from './form-message-lang/form-message-pt';

@Injectable()
export class FormMessageService implements FormMessage {

  protected formMessage: FormMessage;

  constructor() {
    // @todo fazer uma injeção de dependencia para construir o FormMessage com base no idioma utilizado
    this.formMessage = new FormMessagePt();
  }

  get messageNotFound() {
    return this.formMessage.messageNotFound;
  }

  get required() {
    return (control?: AbstractControl) => this.formMessage.required;
  }

  get minlength() {
    return (control?: AbstractControl) => {
      // @ts-ignore
      let requiredLength: any = control.errors ? control.errors.minlength : null;
      requiredLength = requiredLength ? requiredLength.requiredLength : '';

      return this.getStandaloneMessage('minlength', requiredLength);
    };
  }

  get maxlength() {
    return (control?: AbstractControl) => {
      // @ts-ignore
      let bind: any = control.errors ? control.errors.maxlength : null;
      bind = bind ? bind.requiredLength : '';
      return this.getStandaloneMessage('maxlength', bind.toString());
    };
  }

  get pattern() {
    return (control?: AbstractControl) => this.formMessage.pattern;
  }

  get rangeLength() {
    return (control?: AbstractControl) => this.formMessage.rangeLength;
  }

  get length() {
    return (control?: AbstractControl) => this.formMessage.length;
  }

  get min() {
    return (control?: AbstractControl) => this.formMessage.min;
  }

  get gt() {
    return (control?: AbstractControl) => this.formMessage.gt;
  }

  get gte() {
    return (control?: AbstractControl) => this.formMessage.gte;
  }

  get max() {
    return (control?: AbstractControl) => this.formMessage.max;
  }

  get lt() {
    return (control?: AbstractControl) => this.formMessage.lt;
  }

  get lte() {
    return (control?: AbstractControl) => this.formMessage.lte;
  }

  get range() {
    return (control?: AbstractControl) => this.formMessage.range;
  }

  get digits() {
    return (control?: AbstractControl) => this.formMessage.digits;
  }

  get number() {
    return (control?: AbstractControl) => this.formMessage.number;
  }

  get url() {
    return (control?: AbstractControl) => this.formMessage.url;
  }

  get email() {
    return (control?: AbstractControl) => this.formMessage.email;
  }

  get date() {
    return (control?: AbstractControl) => this.formMessage.date;
  }

  get minDate() {
    return (control?: AbstractControl) => this.formMessage.minDate;
  }

  get maxDate() {
    return (control?: AbstractControl) => this.formMessage.maxDate;
  }

  get dateISO() {
    return (control?: AbstractControl) => this.formMessage.dateISO;
  }

  get monthYear() {
    return (control?: AbstractControl) => this.formMessage.monthYear;
  }

  get creditCard() {
    return (control?: AbstractControl) => this.formMessage.creditCard;
  }

  get json() {
    return (control?: AbstractControl) => this.formMessage.json;
  }

  get base64() {
    return (control?: AbstractControl) => this.formMessage.base64;
  }

  get phone() {
    return (control?: AbstractControl) => this.formMessage.phone;
  }

  get uuid() {
    return (control?: AbstractControl) => this.formMessage.uuid;
  }

  get equal() {
    return (control?: AbstractControl) => this.formMessage.equal;
  }

  get notEqual() {
    return (control?: AbstractControl) => this.formMessage.notEqual;
  }

  get equalTo() {
    return (control?: AbstractControl) => this.formMessage.equalTo;
  }

  get notEqualTo() {
    return (control?: AbstractControl) => this.formMessage.notEqualTo;
  }

  get cpf() {
    return (control?: AbstractControl) => this.formMessage.cpf;
  }

  get cnpj() {
    return (control?: AbstractControl) => this.formMessage.cnpj;
  }

  get arrayMinChecked() {
    return (control?: AbstractControl) => {
      // @ts-ignore
      let bind: any = control.errors ? control.errors.minlength : null;
      bind = bind ? bind.requiredLength : '';
      return this.getStandaloneMessage('arrayMinChecked', bind);
    };
  }

  get passwordRules() {
    return (control?: AbstractControl) => this.formMessage.passwordRules;
  }

  get required_unless() {
    return (control?: AbstractControl) => this.formMessage.required_unless;
  }

  get unique() {
    return (control?: AbstractControl) => this.formMessage.unique;
  }

  get maxBinarySize() {
    return (control?: AbstractControl) => {

      // @ts-ignore
      let size = control.errors.maxBinarySize.max;
      // @ts-ignore
      let metric = control.errors.maxBinarySize.metric;

      return this.getStandaloneMessage('maxBinarySize', size, metric);
    };
  }

  get fileFormat() {
    return (control?: AbstractControl) => {
      // @ts-ignore
      let formatListString = control.errors.fileFormat.formatList.join(', ');
      const pos = formatListString.lastIndexOf(',');

      // remove a ultima virgula e coloca um ' ou' se necessário
      formatListString = pos >= 0
        ? formatListString.substring(0, pos) + ' ou' + formatListString.substring(pos + 1)
        : formatListString;

      return this.getStandaloneMessage('fileFormat', formatListString);
    };
  }

  getStandaloneMessage(type: string, ...params: any[]): string {
      // @ts-ignore
    let message = this.formMessage[type]
      // @ts-ignore
      ? this.formMessage[type]
      : '';

    return sprintf(message, ...params);
  }
}
