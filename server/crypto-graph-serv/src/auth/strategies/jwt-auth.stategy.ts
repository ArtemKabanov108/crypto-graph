import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {IJwtUser, IRequestWithUser, IResponseJWTStrategy} from '../../common/interfaces';
import { UserService } from '../../user/services/user.service';
import { LocalStrategy } from './local.strategy';
import { Request } from 'express';
/**
 * Passport JWT Strategy
 */

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly localStrategy: LocalStrategy,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request.headers.authorization;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get('server.jwtSecret'),
    });
  }

  async validate(payload: IJwtUser): Promise<IResponseJWTStrategy> {
    console.log('attention! works JwtStrategy!', payload);
    //TODO
    const { email, nickname } = await this.userService.findUser(payload.userId);
    const user = { email, password: payload.password };
    if (await this.localStrategy.validate(user)) {
      console.log('User found', { email });
      return { id: payload.userId, nickname };
    }
  }
}
