import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as _ from 'lodash';
import * as moment from 'moment';

import { Observable, throwError  } from 'rxjs';

import { environment } from '../../../../environments/environment';

import { AppError } from '../model/app-error';
import { Option } from '../model/option.model';
import { OptionGroup } from '../model/option-group.model';

@Injectable()
export class RequestUtilsService {

  requestOptionsObject;

  constructor() {
    this.requestOptionsObject = { headers: {'Content-Type': 'application/json'} };
  }

  /**
   * Retona a URL da API
   *
   * @returns {any}
   */
  get apiUrl() {
    return environment.api.url;
  }

  /**
   * Retorna as opções de requisição padrão
   *
   * @returns {any}
   */
  get requestOptions(): any {
    return this.requestOptionsObject;
  }

  getHttpOptions(withToken = false, omit = []): any {
    let options = _.cloneDeep(this.requestOptions);

    if (withToken) {
      options.headers['Authorization'] = `Bearer ${this.getToken()}`;
    } else {
      // @ts-ignore
      omit = omit.concat(['headers.Authorization']);
    }

    return _.omit(options, omit);
  }

  /**
   * Processa uma resposta de uma requisição http e retorna um valor tratado
   *
   * @param response
   * @returns {any}
   */
  responseMap(response: any): any {
    return response.hasOwnProperty('json')
      ? response.json()
      : response;
  }

  /**
   * Retorna o token do usuário logado
   *
   * @returns {string | null}
   */
  getToken() {
    return localStorage.getItem('app.token');
  }

  /**
   * Adiciona o token no cabeçalho da requisição
   *
   * @param {string} token
   */
  setToken(token: string): void {
    if (token) {
      this.requestOptions.headers['Authorization'] = `Bearer ${token}`;
    }
  }

  /**
   * @todo chamar esse recurso em um listern
   * Desconsidera os valores nulos e indefinidos. Tais valores causam comportamentos inesperados na API
   * (como o uso de null como parte de uma string mediante conversão de JSON)
   *
   * @param obj
   * @returns {any}
   */
  removeNullFromObject(obj: any) {

    Object.entries(obj)
      .forEach(([key, val]) => {

        if (val && typeof val === 'object' && !(val instanceof File)) {
            this.removeNullFromObject(val)
        } else if (val === null || val === undefined) {
            delete obj[key];
        }

      });

    return obj;

  }

  convertToFormData(data: any, form = null, namespace = ''): FormData {

    let fd = form || new FormData();
    let formKey;

    if (data) {
      Object.keys(data).forEach((key) => {

        if (data.hasOwnProperty(key)) {

          if (namespace) {
              formKey = namespace + '[' + key + ']';
          } else {
              formKey = key;
          }

          if (typeof data[key] === 'object' && !(data[key] instanceof File) && !(data[key] instanceof Date)) {
            const space = namespace ? `${namespace}[${key}]` : key;

            // @ts-ignore
            this.convertToFormData(data[key], fd, space);
          } else {
            fd.append(formKey, data[key]);
          }

        }

      });
    }

    return fd;
  }

  /**
   *
   * @param itemList: any[]
   * @returns {Option[]}
   */
  convertItemListToOptionList(itemList: any[]): Option[] {
    return itemList.map((item: any) => new Option(item.id, item.description));
  }

  /**
   * Converte um resultado para uma lista de options
   *
   * @param {Observable<any>} observable
   * @returns {Observable<any>}
   */
  convertToOptionList(observable: Observable<any>): Observable<any> {
    // @ts-ignore
    return observable.map((response: any) => this.convertItemListToOptionList(response.data));
  }

  /**
   * Converte um resultado para uma lista de options
   *
   * @param {Observable<any>} observable
   * @returns {Observable<any>}
   */
  convertToOptionGroupList(observable: Observable<any>): Observable<any> {
    // @ts-ignore
    return observable.map((response: any) => response.data.map((group: any) => {
      let optionList = this.convertItemListToOptionList(group.items);
      return new OptionGroup(group.id, group.description, optionList);
    }));
  }

  /**
   *
   *
   * @param {HttpClient} http
   * @param {string} url
   * @param filter
   * @param {boolean} convertToOptionList
   * @returns {any}
   */
  public list(
    http: HttpClient,
    url: string,
    filter: any = null,
    convertToOptionList = false
  ): any {

    const requestOptions = Object.assign({}, this.requestOptions);

    requestOptions['params'] = filter;

    // @ts-ignore
    const observable = http.get(url, requestOptions).map(response => this.responseMap(response));

    return convertToOptionList
      ? this.convertToOptionList(observable)
      : observable;
  }

  /**
   *
   *
   * @param {HttpClient} http
   * @param {string} url
   * @param filter
   * @param {boolean} convertToOptionGroupList
   * @returns {any}
   */
  public listGroup(
    http: HttpClient,
    url: string,
    filter: any = null,
    convertToOptionGroupList = false
  ): any {
    // @ts-ignore
    let observable = http.get(url, this.requestOptions).map(response => this.responseMap(response));

    return convertToOptionGroupList
      ? this.convertToOptionGroupList(observable)
      : observable;
  }

  handleError(appError: AppError) {
    return throwError(appError.message);
  };

  prepareDateRange(filter: any, startField: string, endField: string): any {
    if (filter[startField]) {
        filter[startField] = moment(filter[startField]).format('YYYY-MM-DD');
    }

    if (filter[endField]) {
        filter[endField] = moment(filter[endField]).format('YYYY-MM-DD');
    }

    return filter;
  }

}
