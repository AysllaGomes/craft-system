import { HttpErrorResponse } from '@angular/common/http';

export class AppError {

  static GENERIC_ERROR = 1;
  static USERNAME_NOT_FOUND = 2;

  public code: number;
  public message: any;

  constructor(public error: HttpErrorResponse | any) {
    this.code = error.status;
    this.prepareMessage(error);
  }

  private prepareMessage(error: HttpErrorResponse | any) {

    let message: any;

    if (error.hasOwnProperty('error')) {
      message = error.error.message;
    } else if (error.hasOwnProperty('message')) {
      message = error.message;
    } else if (error.hasOwnProperty('_body')) {

      if (error._body.hasOwnProperty('message')) {
        message = error._body.message;
      } else if (typeof error._body === 'string') {
        message = error._body;
      }

    }

    if (typeof message !== 'string') {
      message = message.join(' | ');
    }

    this.message = message !== undefined
      ? message
      : 'Erro não previsto';

  }

  getType() {
    let type = AppError.GENERIC_ERROR;

    if (
      this.message.match(/Unable to load an user with property 'username'/)
    ) { type = AppError.USERNAME_NOT_FOUND; }

    return type;
  }

}
