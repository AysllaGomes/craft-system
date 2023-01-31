export class TokenPayload {
    username: string | undefined;
    user: any;
    roles: string[] | undefined;
    iat: number | undefined;
    exp: number | undefined;

    constructor() {}
}
