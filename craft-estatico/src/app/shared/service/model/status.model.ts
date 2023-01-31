export class Status {
  static ACTIVED = 1;
  static INACTIVATED = 2;
  static EXCLUDED = 3;

  static ACTIVED_NAME = 'Ativo';
  static INACTIVATED_NAME = 'Inativo';
  static EXCLUDED_NAME = 'Excluído';


  /**
   *
   * @param {number} id
   * @param {string} name
   */
  constructor(public id: number, public name: string) {}
}
