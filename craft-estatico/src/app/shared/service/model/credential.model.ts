import { Status } from './status.model';
import { Individual } from './individual.model';

export class Credential {
  public id: number | undefined;

  /**
   *
   * @param {string }username
   * @param {string} password
   * @param {Individual} individual
   * @param {Status} status
   */
  constructor(
    public username: string,
    public password: string,
    public individual: Individual,
    public status: Status
  ) {}
}

