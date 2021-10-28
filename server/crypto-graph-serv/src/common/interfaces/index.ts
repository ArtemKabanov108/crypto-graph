import { Request } from 'express';
import { User } from '../../user/schemas/user-schema';

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
