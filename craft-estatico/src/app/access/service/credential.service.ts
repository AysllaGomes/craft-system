import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { JwtHelper } from 'angular2-jwt';

import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { Status } from '../../shared/service/model/status.model';
import { Credential } from '../../shared/service/model/credential.model';

import { AccessService } from './access.service';
import { RequestUtilsService } from '../../shared/service/http/request-utils.service';

@Injectable()
export class CredentialService {

  protected jwtHelper: JwtHelper;

  constructor(
    protected http: HttpClient,
    protected accessService: AccessService,
    protected requestUtilsService: RequestUtilsService
  ) {

    this.jwtHelper = new JwtHelper();

    if (this.accessService.getToken()) {
      // @ts-ignore
      this.requestUtilsService.setToken(this.accessService.getToken());
    }

  }

  /**
   * Cadastra uma nova credencial
   *
   * @param value
   * @returns {Observable<any[]>}
   */
  create(value: any): Observable<any[]> {
    const url = `${this.requestUtilsService.apiUrl}/credential/`;

    value = this.requestUtilsService.removeNullFromObject(value);

    return this.http.post(url, value, this.requestUtilsService.requestOptions)
      // @ts-ignore
      .map(response => this.requestUtilsService.responseMap(response));
  }

  /**
   * Atualiza os dados da credencial
   *
   * @param {number} id
   * @param {any} value
   * @param {string} justification
   * @returns {Observable<any[]>}
   */
  update(id: number, value: any, justification: string): Observable<any[]> {
    const requestOptions = Object.assign({}, this.requestUtilsService.requestOptions);
    const url = `${this.requestUtilsService.apiUrl}/credential/${id}`;

    value = this.requestUtilsService.removeNullFromObject(value);

    requestOptions['params'] = {justification: justification};

    return this.http.put(url, value, requestOptions)
      // @ts-ignore
      .map(response => this.requestUtilsService.responseMap(response));
  }

  /**
   * Retorna uma lista de credenciais
   *
   * @param filter
   * @param {number} page
   * @param {number} perPage
   * @returns {Observable<Credential[]>}
   */
  list(filter: any = null, page: number, perPage: number): Observable<Credential[]> {

    const requestOptions = Object.assign({}, this.requestUtilsService.requestOptions);
    const url = `${this.requestUtilsService.apiUrl}/credential/`;

    filter = this.requestUtilsService.removeNullFromObject(filter);

    requestOptions['params'] = Object.assign({}, filter, {page: page, perPage: perPage});

    return this.http.get(url, requestOptions)
      // @ts-ignore
      .map(response => this.requestUtilsService.responseMap(response));
  }

  /**
   * Retorna os dados de uma credencial com base no seu ID
   *
   * @param {number} id
   * @returns {Observable<Credential>}
   */
  read(id: number): Observable<Credential> {
    const url = `${this.requestUtilsService.apiUrl}/credential/${id}`;

    return this.http.get(url, this.requestUtilsService.requestOptions)
      // @ts-ignore
      .map(response => this.requestUtilsService.responseMap(response));
  }

  /**
   *
   * @param username
   * @param value
   */
  passwordRecovery(username: string) {
    const url = `${this.requestUtilsService.apiUrl}/credential/password-recovery`;
    const requestOptions = this.requestUtilsService.requestOptions;

    requestOptions['params'] = {username: username};

    return this.http.get(url, requestOptions)
      // @ts-ignore
      .map(response => this.requestUtilsService.responseMap(response));

  }

  /**
   *
   * @param value
   */
  changePassword(value: any) {
    const url = `${this.requestUtilsService.apiUrl}/credential/change-password`;
    const requestOptions = this.requestUtilsService.requestOptions;

    value = this.requestUtilsService.removeNullFromObject(value);

    return this.http.post(url, value, requestOptions)
      .pipe(catchError((error, caught) => {

        let message = error || error.message ? error.message : 'Ocoreu um erro desconhecido';

        if (error && error.code === 403) {
            message = 'Senha atual incorreta.'
        }

        return throwError(message);
      }));

  }

  delete(id: number, justification: string): Observable<any> {
    const requestOptions = Object.assign({}, this.requestUtilsService.requestOptions);
    const url = `${this.requestUtilsService.apiUrl}/credential/${id}`;

    requestOptions['params'] = {justification: justification};

    return this.http.delete(url, requestOptions)
      // @ts-ignore
      .map(response => this.requestUtilsService.responseMap(response));
  }

  activate(id: number): Observable<any> {

    const url = `${this.requestUtilsService.apiUrl}/credential/${id}/activate`;

    return this.http.put(url, null, this.requestUtilsService.requestOptions)
      // @ts-ignore
      .map(response => this.requestUtilsService.responseMap(response));
  }

  deactivate(id: number, justification: string): Observable<any> {
    const requestOptions = Object.assign({}, this.requestUtilsService.requestOptions);
    const url = `${this.requestUtilsService.apiUrl}/credential/${id}/deactivate`;

    requestOptions['params'] = {justification: justification};

    // @ts-ignore
    return this.http.put(url, null, requestOptions).map(response => this.requestUtilsService.responseMap(response));
  }

  /**
   * Verifica se é possível visualizar os dados da credencial
   *
   * @param {Credential} credential
   * @returns {boolean}
   */
  canView(credential: Credential): boolean {
      return true;
  }

  /**
   * Verifica se é possível visualizar o histórico da credencial
   *
   * @param {Credential} credential
   * @returns {boolean}
   */
  canViewHistory(credential: Credential): boolean {
    return true;
  }

  /**
   * @param {number} id
   * @returns {Observable<any[]>}
   */
  history(id: number): Observable<any[]> {
    const url = `${this.requestUtilsService.apiUrl}/credential/${id}/history`;

    return this.http.get(url, this.requestUtilsService.requestOptions)
      // @ts-ignore
      .map(response => this.requestUtilsService.responseMap(response));
  }

  /**
   * Verifica se é possível atualizar os dados da credencial
   *
   * @param {Credential} credential
   * @returns {boolean}
   */
  canUpdate(credential: Credential): boolean {
    return [Status.ACTIVED, Status.INACTIVATED].includes(credential.status.id);
  }

  /**
   * Verifica se é possível ativar a credencial
   *
   * @param {Credential} credential
   * @returns {boolean}
   */
  canActive(credential: Credential): boolean {
    return credential.status.id === Status.INACTIVATED;
  }

  /**
   * Verifica se é possível inativar a credencial
   *
   * @param {Credential} credential
   * @returns {boolean}
   */
  canDeactive(credential: Credential): boolean {
    return credential.status.id === Status.ACTIVED;
  }

  /**
   * Verifica se é possível deletar a credencial
   *
   * @param {Credential} credential
   * @returns {boolean}
   */
  canDelete(credential: Credential): boolean {
    return credential.status.id !== Status.EXCLUDED;
  }
}
