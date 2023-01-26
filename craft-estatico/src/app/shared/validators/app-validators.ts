import { cpf } from './cpf';
import { url } from './url';
import { cnpj } from './cnpj';
import { email } from './email';
import { unique } from './unique';
import { password } from './password';
import { areEquals } from './areEquals'
import { fileFormat } from './file-format';
import { maxBinarySize } from './max-binary-size';
import { checkboxRequired } from './checkbox-required';

export const AppValidators: any = {
    cpf, url, cnpj, email, unique, password, areEquals, fileFormat, maxBinarySize, checkboxRequired
};
