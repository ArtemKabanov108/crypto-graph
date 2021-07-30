import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { IncomingHttpHeaders } from 'http2';

@Injectable()
export default class JwtRefreshGuard extends AuthGuard('jwt-refresh-token') {
  // canActivate(
  //   context: ExecutionContext,
  // ): any | Promise<boolean> | Observable<boolean> {
  //   const request = context.switchToHttp().getRequest();
  //   const requestHeaders: IncomingHttpHeaders = request.headers;
  //   return true;
  // }
}
