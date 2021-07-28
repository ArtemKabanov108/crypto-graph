// import {SessionStatus} from "@okta/okta-sdk-nodejs/src/types/models/SessionStatus";

export default interface ISuccessSessionResponse {
  // session: ISession
  access_token: string;
  // firstName: string
  // lastName: string
  // isActive: boolean,
  // city: string,
  // country: string
  // role: string
}

export interface ISession {
  sessionId: string;
  userId: string;
  userEmail: string;
}

export interface IRegistrationResponse {
  id: string;
}

export interface IUserList {
  email: string;
  watchlist: string[];
}

export interface IUser {
  email: string;
  password: string;
}

export interface IJwtSession {
  sessionId: string;
  createdAt: string;
  expiresAt: string;
  // status: SessionStatus
}

//Jwt interface for strategy and etc.
export interface IJwtUser {
  id: string;
  email: string;
}
//Jwt payload interface
export interface IJwtPayload extends IJwtUser {
  iat: number;
  exp: number;
}
