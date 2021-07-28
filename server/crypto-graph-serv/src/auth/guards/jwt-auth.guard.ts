import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ValidationErrorObject } from '../../common/objects/ValidationErrorObject';
import { Observable } from 'rxjs';
import { JwtStrategy } from '../strategies/jwt-auth.stategy';
import { IncomingHttpHeaders } from 'http2';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly jwtStrategy: JwtStrategy) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): any | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const requestHeaders: IncomingHttpHeaders = request.headers;
    return true;
  }

  handleRequest(err, user) {
    // throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      throw err || new ValidationErrorObject();
    }
    return user;
  }
}
