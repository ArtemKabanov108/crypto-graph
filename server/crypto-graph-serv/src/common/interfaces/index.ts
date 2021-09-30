import { Request } from 'express';
import { User } from '../../user/schemas/user-schema';
import { Types } from "mongoose";

export interface ISession {
  sessionId: string;
  userId: string;
  userEmail: string;
}

export interface IRegistrationResponse {
  getedUser: User;
  accessToken: string;
}

export interface IUserList {
  email: string;
  watchlist: string[];
}

export interface IUser {
  email: string;
  password: string;
}

export interface IJwtRefreshToken {
  sessionId: string;
  createdAt: string;
  expiresAt: string;
  // status: SessionStatus
}

//Jwt interface for strategy and etc.
export interface IJwtUser {
  userId: string;
  password: string
}
//Jwt payload interface
export interface IJwtPayload extends IJwtUser {
  iat: number;
  exp: number;
}

export interface IRequestWithUser extends Request {
  user: User;
}
export interface IRequestUser extends Request {
  user: {
    userId: string;
    refreshToken: string;
  }
}


export interface ITokenPayload {
  userId: number;
  isSecondFactorAuthenticated?: boolean;
}