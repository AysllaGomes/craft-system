import { Phone } from './phone.model';
import { Status } from './status.model';

export class Person {

  public id: number | undefined;

  /**
   * @param name
   * @param email
   * @param phoneList
   * @param status
   */
  constructor(
    public name: string,
    public email: string,
    public phoneList: Phone[] | string[],
    public status: Status
  ) {}
}
