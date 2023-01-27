import { Injectable } from '@angular/core';

// @ts-ignore
import { isString } from 'util';

declare var sweetAlert: any;
declare var $: any;

@Injectable()
export class AlertService {

  constructor() {}

  private getJustifyTemplate(): HTMLElement {
    const div = document.createElement('div');
    const input = document.createElement('input');

    div.setAttribute('id', 'app-alert-justification');
    div.setAttribute('class', 'ui-fluid');
    input.setAttribute('maxLength', '100');
    // @todo por algum motivo o autofocus nao funciona depois que é disparado um novo alerta. volta a funcionar depois que da F5
    input.setAttribute('autofocus', 'autofocus');
    input.setAttribute('required', 'true');
    input.setAttribute('title', 'Justificativa da ação');
    input.setAttribute('class', 'ng-pristine ui-inputtext ui-corner-all ui-state-default ui-widget ng-valid ui-state-filled ng-dirty');

    input.onchange = () => {
      input.value = input.value.trim();
      input.value = input.value.replace(/  +/g, ' ');
    };
    div.appendChild(input);

    return div;
  }

  private getInvalidMessageTemplate(message: string): HTMLElement {
    const text = document.createTextNode(message);
    const div = document.createElement('div');

    div.setAttribute('class', 'ui-message ui-messages-error app-alert-justification-message');
    div.appendChild(text);

    return div;
  }

  private prepareContent(content: Node | string, config: any): any {
    if (isString(content)) {
      config['text'] = content;
    } else {
      config['content'] = content;
    }
    return config;
  }

  wrong(message: string, confirmCallback = null) {
    sweetAlert({text: message, icon: 'error'}).then(confirmCallback);
  }

  right(message: string, confirmCallback = null) {
    sweetAlert({title: message, icon: 'success'}).then(confirmCallback);
  }

  confirmation(message: string, confirmCallback = null, closeModal = true) {
    sweetAlert({
      title: message,
      icon: 'warning',
      buttons: {
        cancel: {
          text: 'Cancelar',
          visible: true,
          closeModal: true
        },
        confirm: {
          text: 'Confirmar',
          closeModal: closeModal,
          value: 'confirm',
        }
      }
    }).then((value: string) => {
      if (value === 'confirm') {
        // @ts-ignore
        confirmCallback();
      }
    });
  }

  /**
   * @param {string} message
   * @param {any} confirmCallback
   */
  justification(message: string, confirmCallback = null) {

    const justificationTemplate = this.getJustifyTemplate();

    const invalidTemplateMessage = this.getInvalidMessageTemplate('A justificativa é obrigatória.');

    sweetAlert({title: 'Justificativa', text: message, content: justificationTemplate, icon: 'warning',
      closeOnClickOutside: false, closeOnEsc: false,
      buttons: {
        cancel: {
          text: 'Cancelar',
          visible: true,
          closeModal: true,
          className: 'app-alert-justification-cancel'
        },
        confirm: {
          text: 'Confirmar',
          closeModal: false,
          className: 'app-alert-justification-confirm'
        }
      }
    });


    $('body').off('click', '.app-alert-justification-confirm');

    $('#app-alert-justification input').on('keydown', () => {
      $('#app-alert-justification input').removeClass('ng-invalid');
      $('.app-alert-justification-message').remove();
    });

    $('body').on('click', '.app-alert-justification-confirm', () => {

      const input = <HTMLInputElement>document.querySelector('#app-alert-justification input');

      if (input.checkValidity()) {
        input.setAttribute('disabled', 'disabled');
        $('.app-alert-justification-confirm').attr('disabled', 'disabled');
        $('.app-alert-justification-cancel').attr('disabled', 'disabled');
        // @ts-ignore
        confirmCallback(input.value);
      } else {

        $(input).addClass('ng-invalid');
        $('#app-alert-justification').append(invalidTemplateMessage);

        sweetAlert.stopLoading();
      }

    });

  }

  // @ts-ignore
  open(config, confirmCallback = null) {
    sweetAlert(config).then(confirmCallback);
  }

  close() {
    sweetAlert.close();
  }

  success(title: string, content: Node | string = '', confirmCallback = null) {
    let config = this.prepareContent(content, {title: title, icon: 'success'});
    sweetAlert(config).then(confirmCallback);
  }

  info(title: string, content: Node | string = '', confirmCallback = null) {
    let config = this.prepareContent(content, {title: title, icon: 'info'});
    sweetAlert(config).then(confirmCallback);
  }

  error(title: string, content: Node | string = '', confirmCallback = null) {
    let config = this.prepareContent(content, {title: title, icon: 'error'});
    sweetAlert(config).then(confirmCallback);
  }

  warning(title: string, content: Node | string = '', confirmCallback = null) {
    let config = this.prepareContent(content, {title: title, icon: 'warning'});
    sweetAlert(config).then(confirmCallback);
  }

  confirm(title: string, content: Node | string = '', confirmCallback = null, closeModal = true) {
    let config = this.prepareContent(content, {
      title: title,
      icon: 'warning',
      buttons: {
        cancel: {
          text: 'Cancelar',
          visible: true,
          closeModal: true
        },
        confirm: {
          text: 'Confirmar',
          closeModal: closeModal,
          value: 'confirm',
        }
      }
    });

    sweetAlert(config).then((value: string) => {
      if (value === 'confirm') {
        // @ts-ignore
        confirmCallback();
      }
    });
  }

  justify(title: string, content: Node | string, confirmCallback = null) {

    let config;

    title = title ? title : 'Justificativa';

    // @todo por algum motivo o autofocus nao funciona depois que é disparado um novo alerta. volta a funcionar depois que da F5
    const justificationTemplate = this.getJustifyTemplate();

    const invalidTemplateMessage = this.getInvalidMessageTemplate('Este campo é requerido');

    config = this.prepareContent(content, {
      title: title,
      content: justificationTemplate,
      icon: 'warning',
      closeOnClickOutside: false,
      closeOnEsc: false,
      buttons: {
        cancel: {
          text: 'Cancelar',
          visible: true,
          closeModal: true,
          className: 'app-alert-justification-cancel'
        },
        confirm: {
          text: 'Confirmar',
          closeModal: false,
          className: 'app-alert-justification-confirm'
        }
      }
    });
    sweetAlert(config);


    $('body').off('click', '.app-alert-justification-confirm');

    $('#app-alert-justification input').on('keydown', () => {
      $('#app-alert-justification input').removeClass('ng-invalid');
      $('.app-alert-justification-message').remove();
    });

    $('body').on('click', '.app-alert-justification-confirm', () => {

      const input = <HTMLInputElement>document.querySelector('#app-alert-justification input');

      if (input.checkValidity()) {
        input.setAttribute('disabled', 'disabled');
        $('.app-alert-justification-confirm').attr('disabled', 'disabled');
        $('.app-alert-justification-cancel').attr('disabled', 'disabled');
        // @ts-ignore
        confirmCallback(input.value);
      } else {

        $(input).addClass('ng-invalid');
        $('#app-alert-justification').append(invalidTemplateMessage);

        sweetAlert.stopLoading();
      }

    });

  }

}
