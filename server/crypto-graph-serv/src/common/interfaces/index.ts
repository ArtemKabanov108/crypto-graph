import { Request } from 'express';
import { User } from '../../user/schemas/user-schema';
import {weekAverager} from "../helpers/weekAverager";

export interface ISession {
  sessionId: string;
  userId: string;
  userEmail: string;
}

export interface IRegistrationResponse {
  receivedUser: User;
  accessToken: string;
}

export interface IUserList {
  userId: string;
  watchlist: string[];
}

export interface IUser {
  email: string;
  password: string;
}

export interface IJwtRefreshToken {
  userId: string;
  iat: number;
  exp: number;
}

//Jwt interface for strategy and etc.
export interface IJwtUser {
  userId: string;
  password: string;
}
//Jwt payload interface
export interface IJwtPayload extends IJwtUser {
  iat: number;
  exp: number;
}

export interface IRequestWithUser {
  user: {
    id: string;
    nickname: string;
  };
}

export interface IResponseJWTStrategy {
  id: string;
  nickname: string;
}

export interface IRequestUser extends Request {
  user: {
    userId: string;
    refreshToken: string;
  };
}

export interface ITokenPayload {
  userId: number;
  isSecondFactorAuthenticated?: boolean;
}

export interface ILogin {
  LoggedUser: User;
  tokenRefresh: string;
}

export interface IMessage {
  message: string;
}

export interface IParamsCrypto {
  vs_currency: string;
  from: number;
  to: number;
}

export interface IGeckoResponce {
  /**
   * Whether the response status code returned a successful code (>200 && <300).
   */
  success: boolean;
  /**
   * The response status message
   */
  message: string;
  /**
   * The response status code
   */
  code: number;
  /**
   * The body data in JSON format from the request.
   */
  data: any;
}

export interface IParseData {
  id: string;
  symbol: string;
  image: {
    thumb: string;
    small: string;
    large: string;
  };
  current_price: {
    [key: string]: string;
  };
  market_cap: {
    [key: string]: string;
  };
}

export interface IWeek {
  Mon: number;
  Tu: number;
  We: number;
  Thu: number;
  Fr: number;
  Sun: number;
  Sat: number;
}

export interface ICurrencyCalculation {
  coin: string;
  success: string;
  message: string;
  code: number;
  data: {
    price_average: IWeek;
    market_cap_average: IWeek;
  };
}
