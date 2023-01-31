import {Injectable} from '@angular/core';
import {FormMessage} from './form-message';

@Injectable()
export class FormMessagePt implements FormMessage {

    messageNotFound = 'Sem mensagem definida';
    required = 'Este campo é requerido';
    minlength = 'Informe no mínimo %s';
    maxlength = 'Informe no máximo %s';
    pattern = 'Forneça um valor válido';
    rangeLength = 'Forneça um valor entre %s e %s caracteres de comprimento';
    length = 'É necessário digitar %s caracteres';
    min = 'Forneça um valor maior ou igual a %s';
    gt = 'Forneça um valor maior a %s';
    gte = 'Forneça um valor maior ou igual a %s';
    max = 'Forneça um valor menor ou igual a %s';
    lt = 'Forneça um valor menor a %s';
    lte = 'Forneça um valor menor ou igual a %s';
    range = 'Forneça um valor entre %s e %s';
    digits = 'Forneça somente dígitos';
    number = 'Forneça um número válido';
    url = 'Forneça uma URL válida';
    email = 'Forneça um e-mail válido';
    date = 'Forneça uma data válida';
    minDate = 'Forneça uma data menor ou igual a %s';
    maxDate = 'Forneça uma data maior ou igual a %s';
    dateISO = 'Forneça uma data válida (ISO)';
    monthYear = 'Forneça um mês/ano válido';
    creditCard = 'Forneça um cartão de crédito válido';
    json = 'Forneça um JSON válido';
    base64 = 'Forneça um base64 válido';
    phone = 'Forneça um telefone válido';
    uuid = 'Forneça um identificador único universal válido';
    equal = 'Forneça um valor igual a %s';
    notEqual = 'Forneça o mesmo valor novamente';
    equalTo = 'Forneça o mesmo valor novamente';
    notEqualTo = 'Não forneça o valor %s';
    cpf = 'Forneça um CPF válido';
    cnpj = 'Forneça um CNPJ válido';
    arrayMinChecked = 'Escolha pelo menos %s itens';
    passwordRules = 'A senha informada não atende as regras de segurança da aplicação';
    required_unless = 'Preencha pelo menos um desses campos';
    unique = 'Informe valores diferentes';
    maxBinarySize = 'Tamanho máximo de %s %s';
    fileFormat = 'Apenas os seguintes formatos são válidos: %s';


}
