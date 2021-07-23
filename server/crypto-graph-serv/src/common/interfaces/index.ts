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

export interface IUser {
  email: string;
  watchlist: string[];
}

export interface IJwtSession {
  sessionId: string;
  createdAt: string;
  expiresAt: string;
  // status: SessionStatus
}
