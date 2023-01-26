import {
    HttpErrorResponse,
    HttpEvent,
    HttpEventType,
    HttpHandler,
    HttpInterceptor,
    HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AppError } from '../service/model/app-error';

declare var window: Window;

export class HttpExceptionInterceptor implements HttpInterceptor {
  intercept(event: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<HttpEventType.Response>> {

    // @ts-ignore
    return next.handle(event)
      .pipe(
        catchError((response: HttpErrorResponse) => {

          let error = new AppError(response);

          if (error.code === 401 && error.getType() === AppError.USERNAME_NOT_FOUND) {
            window.location.href = '/acesso/sair';
          }

          // @ts-ignore
          return Observable.throw(error);
        })
      );
  }
}
