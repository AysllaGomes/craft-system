import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { TranslateService } from '@ngx-translate/core';

import { AppError } from '../../shared/service/model/app-error';

import { AccessService } from '../service/access.service';
import { AlertService } from '../../shared/service/alert.service';
import { FormUtilsService } from '../../shared/service/form/form-utils.service';

@Component({
    selector: 'app-access-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // @ts-ignore
  public form: FormGroup;
  public showRecovery = false;
  private isEnabledSubmit = true;

  constructor(
    protected router: Router,
    protected formBuilder: FormBuilder,
    protected alertService: AlertService,
    protected accessService: AccessService,
    protected formUtilsService: FormUtilsService,
    protected translateService: TranslateService,
  ) {}

  ngOnInit() {
    this.form = this.createForm();
  }

  /**
   * Cria uma nova instancia do formulário
   *
   * @returns {FormGroup}
   */
  createForm(): FormGroup {
    return this.formBuilder.group({
      username: [null, [
        Validators.required,
        Validators.maxLength(100)
      ]],
      password: [null, [
        Validators.required,
        Validators.maxLength(8),
      ]]
    });
  }

  /**
   * Verifica se a submissão do formulário está desativada
   *
   * @returns {boolean}
   */
  isDisabledSubmit() {
    return !this.isEnabledSubmit;
  }

  /**
   * Tenta autenticar o usuário
   */
  authenticate() {
    if (this.formUtilsService.validate(this.form)) {
      this.isEnabledSubmit = false;

      // @ts-ignore
      const username = this.form.get('username').value;
      // @ts-ignore
      const password = this.form.get('password').value;

      this.accessService.authenticate(username, password)
        .subscribe(
          (data) => this.saveSuccessAction(),
          (error: AppError) => this.saveErrorAction(error)
        );
    }
  }

  /**
   * Ação executada caso sucesso
   */
  saveSuccessAction(): void {
      this.router.navigate(['/dashboard']);
  }

  /**
   * Ação executada caso não seja realizada com sucesso
   *
   * @param {AppError} error
   */
  saveErrorAction(error: AppError): void {
    this.isEnabledSubmit = true;

    // @ts-ignore
    this.form.get('password').reset();

    this.alertService.error(
      '',
      error.message
    );
  }

  toggleRecovery() {
    this.showRecovery = !this.showRecovery;
  }

  getRouteHomepage() {
    return `/${this.translateService.getDefaultLang()}`;
  }
}
