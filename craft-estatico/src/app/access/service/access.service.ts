import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/throw';

import { JwtHelper } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { TokenPayload } from './model/token-payload.model';
import { Credential } from '../../shared/service/model/credential.model';

import { RequestUtilsService } from '../../shared/service/http/request-utils.service';

@Injectable()
export class AccessService {

  protected jwtHelper: JwtHelper;

  constructor(
    protected http: HttpClient,
    protected requestUtilsService: RequestUtilsService
  ) {
    this.jwtHelper = new JwtHelper();

    if (this.getToken()) {
      // @ts-ignore
      this.requestUtilsService.setToken(this.getToken());
    }

  }

  /**
   * Autentica uma credencial de acesso
   *
   * @param {string} username
   * @param {string} password
   * @returns {Observable<any>}
   */
  authenticate(username: string, password: string): Observable<any> {
    const url = `${this.requestUtilsService.apiUrl}/access/login_check`;

    // veja https://github.com/lexik/LexikJWTAuthenticationBundle/blob/master/ResourceEnums/doc/index.md#usage
    const credentialLexik = {
        _username: username,
        _password: password
    };

    return this.http.post(url, credentialLexik, this.requestUtilsService.requestOptions)
      // @ts-ignore
      .map(response => this.requestUtilsService.responseMap(response))
      // @ts-ignore
      .do(response => this.storesCredentials(response));
  }

  /**
   * Desloga da aplicação
   */
  logout(): void {
    /** @todo analisar o impacto que isso causará quando os dados offlines sejam implementados.
     * é possível que ao deslogar, o usuário perca todos os dados offline armazenados
     */
    localStorage.clear();
    sessionStorage.clear();
  }

  /**
   * Armazena a credencial de acesso
   *
   * @param response
   */
  private storesCredentials(response: any) {

      const token = response.token;
      const payload = this.jwtHelper.decodeToken(token);
      const jsonPayload = JSON.stringify(payload);

      localStorage.setItem('app.token', token);
      localStorage.setItem('app.token.payload', jsonPayload);
      localStorage.setItem('app.token.roles', '|' + payload['roles'].join('|') + '|');

  }

  /**
   * Retorna o token do usuário logado
   *
   * @returns {string | null}
   */
  getToken() {
      return localStorage.getItem('app.token');
  }

  getTokenRoleString() {
      return localStorage.getItem('app.token.roles');
  }

  /**
   * Retorna o payload do token armazenado
   *
   * @returns {TokenPayload}
   */
  getTokenPayload(): TokenPayload {
      const json = localStorage.getItem('app.token.payload');
      return json ? JSON.parse(json) : null;
  }

  /**
   * Retorna as credenciais de acesso do ativo logado
   *
   * @returns {Credential}
   */
  getCredential(): Credential | null {
    if (this.getToken()) {
      const tokenPayload = this.getTokenPayload();

      // @ts-ignore
      const credential = new Credential(tokenPayload.username, '', tokenPayload.user.individual, null);

      credential.id = tokenPayload.user.id;

      return credential;
    }

    return null;
  }

  /**
   * Retorna se o usuário está autenticado
   *
   * @returns {boolean}
   */
  isLogged() {
    const token = this.getToken();

    return token
      ? !this.jwtHelper.isTokenExpired(token)
      : false;
  }

  /**
   * Retorna se o usuário está autenticado
   *
   * @returns {boolean}
   */
  hasRole(roleList: Array<string>): boolean {
    const allRole = this.getTokenRoleString();

    return this.getTokenRoleString()
      // @ts-ignore
      ? roleList.some((role) => allRole.indexOf(`|${role}|`) != -1)
      : false;
  }
}
