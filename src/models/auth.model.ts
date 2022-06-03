export class JwtPayload {
  /** userId */
  sub: number;
  expiresIn: Date;
}

export class JwtToken {
  access: string;
  refresh: string;
}
