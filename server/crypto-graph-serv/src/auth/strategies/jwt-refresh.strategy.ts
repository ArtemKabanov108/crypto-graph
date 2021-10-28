import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { IJwtRefreshToken } from '../../common/interfaces';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([ (request: Request) => {
        console.log("Check cookie JwtRefreshTokenStrategy", request.cookies.tokenRefresh )
          return request.cookies.tokenRefresh;
        },
      ]),
      secretOrKey: configService.get('JWT_REFRESH_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: IJwtRefreshToken) {
    console.log('attention! works JwtRefreshTokenStrategy!', payload);
    const { userId } = payload;
    const refreshToken = request.cookies.tokenRefresh;
    console.log('JwtRefreshTokenStrategy, validate  refreshToken', { refreshToken });
    const refreshTokenValid = this.authService.getUserIfRefreshTokenMatches(
      refreshToken,
      payload.userId,
    );
    if (refreshTokenValid) {
      return { userId, refreshToken };
    }
  }
}
