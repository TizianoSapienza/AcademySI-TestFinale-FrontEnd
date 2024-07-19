export interface SignInResponse {
  token: string;
  ttl: Date;
  tokenCreationTime: Date;
}