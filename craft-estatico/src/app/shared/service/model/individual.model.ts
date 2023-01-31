import { Phone } from './phone.model';
import { Person } from './person.model';
import { Status } from './status.model';
import { Credential } from './credential.model';

export class Individual extends Person {

    /**
     * Individual constructor.
     *
     * @param status
     * @param credential
     * @param phoneList
     * @param name
     * @param email
     * @param positionHeld
     */
    constructor(
      public override status: Status,
      // @ts-ignore
      public credential: Credential = null,
      public override phoneList: string[] | Phone[],
      public override name: string,
      public override email: string,
      public positionHeld: string
    ) {

        super(name, email, phoneList, status);

    }

}
